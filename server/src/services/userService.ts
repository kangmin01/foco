import { userModel, userModelType } from "../models";
import { UserInterface, LoginInterface } from "../models/schemas/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretKey } from "../config";
import dotenv from "dotenv";
import differenceInDays from "date-fns/differenceInDays";

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
    async findUser(email: any) {
        return await this.User.findOne({ email: email }).populate("post");
    }

    async updateUser(userNum: any, userInfo: UserInterface) {
        // const user = await this.User.findOne({ email: userInfo.email });
        // const hashedPassword = userInfo.password
        // ? await bcrypt.hash(userInfo.password, 10)
        // : null;
        // const userInfoUpdated = {
        // ...user,
        // ...(hashedPassword ? { password: hashedPassword } : {}),
        // };
        // return await this.User.findOneAndUpdate(
        // { name: userInfo.name },
        // userInfoUpdated
        // );
        return await this.User.findOneAndUpdate({userNum}, { $set: userInfo}).exec();
    }

    async deleteUser(userNum: any) {
        return await this.User.findOneAndDelete({ userNum: userNum });
    }
}

const userService = new UserService(userModel);

export { userService };