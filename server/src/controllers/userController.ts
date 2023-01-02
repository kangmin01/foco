import { UserInterface } from '../models/schemas/user';
import { userService } from '../services';
import { AsyncRequestHandler } from '../types';

interface userControllerInterface {
    getUser: AsyncRequestHandler;
    deleteUser: AsyncRequestHandler;
    updateUser: AsyncRequestHandler;
    tokenRefresh: AsyncRequestHandler;
    uploadFileToS3: AsyncRequestHandler;
    loginUser: AsyncRequestHandler;
    registerUser: AsyncRequestHandler;
    addUserPost: AsyncRequestHandler;
    userPasswordUpdate: AsyncRequestHandler;
    passwordInitialization: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
    async loginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await userService.loginUser({ email, password });
        res.json({ user });
    },
    
    async registerUser(req, res) {
        const user = await userService.createUser(req.body);
        res.json({ user });
    },
    //회원정보
    async getUser(req, res) {
        const { userNum } = req.params;
    const user = await userService.findUser(userNum);
    res.json({ user });
},
    //회원정보 수정
    async updateUser(req, res) {
        const { userNum } = req.params;
        const newInfo: UserInterface = req.body;
        const user = await userService.updateUser(userNum, newInfo);
    res.json({ user });
},
    //탈퇴
    async deleteUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
    const user = await userService.deleteUser({email, password});
    res.json({ user });
},

    async tokenRefresh(req, res, _, isLogin: boolean) {
    const token = req.headers.authorization?.split(' ')[1];
    const refreshed = await userService.expandAccToken(token!, isLogin);
    res.json(refreshed)
},
    async uploadFileToS3(req, res){
    if (!req.file) return res.status(400);
    const fileData: any = req.file;
    try {
        res.send(fileData.location);
    } catch (error){
        console.log(error);
    }
},
    async addUserPost(req, res) {
        const { id } = req.params;
        const { userNum } = req.params;
        const user = await userService.addUserPost(id, userNum);
        res.json(user);
    },
    async userPasswordUpdate(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const newPassword2 = req.body.newPassword2;
        const user = await userService.userPasswordUpdate({ email, password }, newPassword, newPassword2);
        res.json(user);
    },
    async passwordInitialization(req, res) {
        const email = req.body.email;
        const user = await userService.passwordInitialization(email);
        res.json(user);
    }
};