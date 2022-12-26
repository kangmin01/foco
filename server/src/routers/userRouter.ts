import { Router } from 'express';
import { userController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';
import { uploads } from '../utils/multerConfig';

export const userRouter = Router();

userRouter.post('/login', asynHandler(userController.loginUser));
userRouter.post('/register', asynHandler(userController.registerUser));
userRouter.get('/profile/:userNum', asynHandler(userController.getUser));
userRouter.get('/security/:userNum', asynHandler(userController.getUser));
userRouter.get('/deactivate/:userNum', asynHandler(userController.getUser));
userRouter.delete('/:userNum', asynHandler(userController.deleteUser));

userRouter.patch('/:userNum', asynHandler(userController.updateUser)); //lR
userRouter.post('/upload', uploads.single('image'), asynHandler(userController.uploadFileToS3));
userRouter.get('/remember', asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, true);})
);

userRouter.get('/refresh',asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, false);
})
);