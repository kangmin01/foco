import { Router } from 'express';
import { postController } from '../controllers';
import { loginRequired } from '../middlewares';
import { asynHandler } from '../utils/asynHandler';
import { uploads } from '../utils/multerConfig';

export const postRouter = Router();

postRouter.post('/' ,asynHandler(postController.postPost)); //lR
postRouter.patch('/:postNum', asynHandler(postController.patchPost));//lR
postRouter.get('/', asynHandler(postController.readPost));
postRouter.get('/:postNum', asynHandler(postController.readOnePost));
postRouter.delete('/:postNum', asynHandler(postController.deleteOnePost));//lR
postRouter.post('/upload', uploads.array('images',5), asynHandler(postController.uploadFileToS3));//lR

postRouter.post('/like/:userNum/:postNum', asynHandler(postController.likePlusPost));//lR
postRouter.delete('/like/:userNum/:postNum', asynHandler(postController.likeMinusPost));//lR
postRouter.get('/like/:postNum', asynHandler(postController.getlikeCount));