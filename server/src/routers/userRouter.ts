import { Router } from 'express';
import { userController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';
import { uploads } from '../utils/multerConfig';

export const userRouter = Router();

userRouter.post('/login', asynHandler(userController.loginUser));
userRouter.post('/register', asynHandler(userController.registerUser));
userRouter.get('/:email', asynHandler(userController.getUser));
userRouter.patch('/:userNum', asynHandler(userController.updateUser)); //lR
userRouter.delete('/:userNum', asynHandler(userController.deleteUser));
userRouter.post('/upload', uploads.single('image'), asynHandler(userController.uploadFileToS3));

userRouter.get('/remember', asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, true);})
);

userRouter.get('/refresh',asynHandler(async (req, res, next) => {
    await userController.tokenRefresh(req, res, next, false);
})
);