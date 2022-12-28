import { userModel, userModelType } from "../models";
import { UserInterface, LoginInterface } from "../models/schemas/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretKey,
    SMTPPW,
    SMTPID} from "../config";
import dotenv from "dotenv";
import differenceInDays from "date-fns/differenceInDays";
import nodemailer from "nodemailer";

dotenv.config;


class UserService {
    private User: userModelType;

    // 의존성 주입
    constructor(userModel: userModelType) {
        this.User = userModel;
    }

    private tokenCreate = (
        isAccess: boolean,
        email: string,
        country: string
    ): string => {
        return jwt.sign(
        isAccess ? { email, country } : { email, country, date: new Date() },
        secretKey,
        {
            expiresIn: isAccess ? '1m' : '14d',
        }
    );
    };

    private refreshExpireCheck = (token: string): boolean => {
        const refreshDecoded = jwt.verify(token, secretKey);
        const date = (<{ date: string }>refreshDecoded).date;
        const diff = differenceInDays(new Date(), new Date(date));
        return diff < 4;
    };

    async createUser(userInfo: UserInterface) {
        const { email,
                name,
                password,
                country,
                img,
                } = userInfo;
    const userEmailValidation = await this.User.findOne({ email: email });
    if (userEmailValidation) {
        throw new Error(
            '이미 사용중인 이메일입니다.'
        );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerInfo = {
        email,
        name,
        password: hashedPassword,
        country,
        img,
        role: 'user',
        };
        return await this.User.create(registerInfo);
    }

    //계정 로그인
    async loginUser(loginInfo: LoginInterface) {
        const { email, password } = loginInfo;
        const user = await this.User.findOne({ email: email });
      // 계정 가입 내역 확인
        if (!user) {
        throw new Error(
            '가입하지 않은 이메일입니다.'
        );
        }

      // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(
        password,
        correctPasswordHash
        );

        if (!isPasswordCorrect) {
        throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요');
        }

        const { role } = user;
        const accessToken = this.tokenCreate(true, email, role);
        const refreshToken = this.tokenCreate(false, email, role);

      //DB에 refresh token 저장
        const loginUser = await this.User.findOneAndUpdate(
        { email: user.email },
        {
            refreshToken: refreshToken,
            recentLogin: Date.now(),
        },
        { returnOriginal: false }
        );
        return { user: loginUser, accessToken, refreshToken };
    }

    // 계정 로그아웃
    async logoutUser(userNum: any) {
        const filter = { userNum };
        const option = { returnOriginal: false };
        return await this.User.findOneAndUpdate(
        filter,
        { $unset: { refreshToken: '' } },
        option
        );
    }

    // 엑세스 토큰 재발급
    async expandAccToken(_refreshToken: string, isLogin: boolean) {
        const user = await this.User.findOne({ refreshToken: _refreshToken });
        if (!user) {
        throw new Error('해당하는 토큰에 유효한 사용자는 존재하지 않습니다');
        }

        if (_refreshToken !== user?.refreshToken) {
        throw new Error(
            '토큰 만료, 다시 로그인 해주세요'
        );
        }
        const { email, role } = user;
        const accessToken = this.tokenCreate(true, email, role);
        let refreshToken = _refreshToken;

        if (this.refreshExpireCheck(_refreshToken)) {
        refreshToken = this.tokenCreate(false, email, role);
        await this.User.findOneAndUpdate(
            { email },
            isLogin ? { refreshToken, recentLogin: Date.now() } : { refreshToken }
        );
        }

        return { user, accessToken, refreshToken };
    }
    //유저 하나 조회(유저의 게시물도)
    async findUser(userNum: any) {
        return await this.User.findOne({ userNum: userNum }).populate("post");
    }

    async updateUser(userNum: any, userInfo: UserInterface) {
        return await this.User.findOneAndUpdate({userNum}, { $set: userInfo}, {new: true}).exec();
    }

    async deleteUser(loginInfo: LoginInterface) {
        const { email, password } = loginInfo;
        const user = await this.User.findOne({email});
        if (!user) {
            throw new Error (
                '가입하지 않은 이메일입니다.'
            );}
        const hashedPassword = user.password;
        const isPassword = await bcrypt.compare(
            password,
            hashedPassword
        )
        if (!isPassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        else {
            return await this.User.findOneAndDelete({ email: email });
        }
        
    }

    //유저 게시글 db에 추가
    async addUserPost(id: any, userNum: any) {
        return await this.User.findOneAndUpdate(
            {userNum}, 
            {$push: {post: id}}
            ,{new: true}).exec();
    }

    //유저 비밀번호 수정
    async userPasswordUpdate(loginInfo: LoginInterface, newPassword: any, newPassword2: any) {
        const { email, password } = loginInfo;
        const user = await this.User.findOne({email: email});

        if (!user) {
            throw new Error (
                '가입하지 않은 이메일입니다.'
            );}

        const hashedPassword = user.password;
        const isPassword = await bcrypt.compare(
            password,
            hashedPassword
        )
        if (!isPassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        else {
            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            if (newPassword !== newPassword2) {
                throw new Error(
                    '변경할 비밀번호가 일치하지 않습니다.'
                )
            }
            else {
                return await this.User.findOneAndUpdate(
                    {email},
                    {password: newHashedPassword},
                    {new: true}).exec();
            }
        }
        
    }

    async passwordInitialization(email: string) {
        const user = await this.User.findOne({email: email});
        if(!user) {
            throw new Error(
                '가입하지 않은 이메일입니다.'
            )
        } else {
            const resetPw = Math.random().toString(36).substring(2);
            const smtpTransport = nodemailer.createTransport({
                service: 'Naver',
                host: 'smtp.naver.com',
                auth: {
                    user: SMTPID,
                    pass: SMTPPW,
                },
                port: 465,
                tls: {
                    rejectUnauthorized: false,
                }
            });

            const mailOptions = {
                from: `FOCO<${SMTPID}>`,
                to: email,
                subject: '[FOCO 비밀번호 초기화]',
                text: `비밀번호를 ${resetPw}로 초기화 했습니다. 로그인 후 비밀번호를 변경해 주세요`
            };

            try {
                await smtpTransport.sendMail(mailOptions);
            } catch (err) {
                throw new Error('비밀번호 초기화 메일 전송 실패');
            }

            try {
                const password = await bcrypt.hash(resetPw, 10);
                await this.User.findOneAndUpdate(
                    {email},
                    {password: password},
                    {new: true}).exec();
            } catch(err) {
                throw new Error('비밀번호 초기화 실패');
            }
            return {
                status: 'OK',
                message: '비밀번호 초기화 및 메일 전송 성공'
            }
        }
    }
}

const userService = new UserService(userModel);

export { userService };