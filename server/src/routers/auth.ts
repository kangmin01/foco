import passport from 'passport';
import { Router } from 'express';
import { User } from '../models/userModel';
import { setUserToken } from '../utils/jwt';
import { hashPassword } from '../utils/hash-password';
import { asyncHandler } from '../utils/async-handler';
import { local } from '../passport/strategies/local';
import { google } from '../passport/strategies/google';
import { generateRandomPassword } from '../utils/generate-random-password';
import { sendMail } from '../utils/send-mail';
import { loginRequired } from '../middlewares/login-required';
import { userInfo } from 'os';

const authRouter = Router();

//회원가입 요청 핸들러
authRouter.post(
  '/join',
  asyncHandler(async (req, res, next) => {
    const { email, name, password, country } = req.body;
    const pwHash = hashPassword(password);
    const exists = await User.findOne({
      email,
    });

    if (exists) {
      throw new Error('이미 가입된 메일입니다.');
    }

    await User.create({
      email,
      name,
      password: pwHash,
      country,
    });
    res.redirect('/');
  })
);

//로그인 요청 핸들러
authRouter.post(
  '/login',
  passport.authenticate(local, {
    session: false,
  }),
  asyncHandler((req, res, next) => {
    setUserToken(res, req.user);
    if (req.user.passwordReset) {
      // res.redirect('/auth/change-password');
      return;
    }
    // res.redirect('/');
  })
);

//구글로그인 요청 핸들러
authRouter.get(
  '/google',
  passport.authenticate(google, { scope: ['profile', 'email'] })
);

//구글 로그인 성공시 콜백 요청 핸들러
authRouter.get(
  '/google/callback',
  passport.authenticate(google, {
    session: false,
  }),
  asyncHandler((req, res, next) => {
    setUserToken(res, req.user);
    res.redirect('/');
  })
);

//비밀번호찾기 페이지 요청 핸들러
authRouter.get('/reset-password', (req, res, next) => {
  res.render('reset-password');
});

//새비밀번호 받기 요청 핸들러
authRouter.post(
  '/reset-password',
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('해당 메일로 가입된 사용자가 없습니다.');
    }
    const PW = generateRandomPassword();
    await User.findOneAndUpdate(
      { email },
      {
        password: hashPassword(PW),
        passwordReset: true,
      }
    );
    sendMail(
      email,
      '비밀번호가 변경되었습니다.',
      `변경된 비밀번호는: ${PW}입니다.`
    );
    res.render('reset-password-confirmed');
  })
);

//비밀번호 변경하기 페이지
authRouter.get('/change-password', (req, res, next) => {
  res.render('change-password');
});

//비밀번호 변경 요청 핸들러
authRouter.post(
  '/change-password',
  asyncHandler(async (req, res) => {
    const { current_password, new_password } = req.body;
    const user = await User.findOne({ shortId: req.user.shortId });
    if (!user) {
      throw new Error('유저가 없습니다.');
    }
    if (user.password !== hashPassword(current_password)) {
      throw new Error('임시 비밀번호가 일치하지 않습니다.');
    }

    await User.updateOne(
      { shortId: user.shortId },
      {
        password: hashPassword(new_password),
        passwordReset: false,
      }
    );

    res.redirect('/logout');
  })
);

//마이페이지 계정
authRouter.get(
  '/myAccount',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { shortId } = req.user;
    const user = await User.findOne({ shortId });
    res.render('myAccount', { user });
  })
);

//회원정보 수정 요청 핸들러
authRouter.patch(
  '/myAccount/:shortId',
  asyncHandler(async (req, res, next) => {
    const shortId = req.params.shortId;
    const { country, name } = req.body;
    const user = await User.findOneAndUpdate({ shortId }, { country, name });
    res.redirect('/');
  })
);

//회원탈퇴 요청 핸들러
authRouter.delete(
  '/myAccount/:shortId',
  asyncHandler(async (req, res, next) => {
    const shortId = req.params.shortId;
    const deletedUser = await User.findOneAndDelete({ shortId });
    res.redirect('/');
  })
);

export { authRouter };
