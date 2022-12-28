import { Router } from 'express';
import { userController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';
import { uploads } from '../utils/multerConfig';

export const userRouter = Router();

userRouter.post('/login', asynHandler(userController.loginUser));
userRouter.post('/register', asynHandler(userController.registerUser));
userRouter.get('/:userNum', asynHandler(userController.getUser));
userRouter.post('/:id/:userNum', asynHandler(userController.addUserPost));
userRouter.patch('/password', asynHandler(userController.userPasswordUpdate)); //lR
userRouter.patch('/:userNum', asynHandler(userController.updateUser)); //lR
userRouter.delete('/', asynHandler(userController.deleteUser)); //lR
userRouter.post('/upload', uploads.single('image'), asynHandler(userController.uploadFileToS3));

userRouter.get('/remember', asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, true);})
);

userRouter.get('/refresh',asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, false);
})
);