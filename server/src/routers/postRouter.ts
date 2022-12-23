import { Router } from 'express';
import { postController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';
import { uploads } from '../utils/multerConfig';

export const postRouter = Router();

postRouter.post('/', asynHandler(postController.postPost));
postRouter.patch('/:postNum', asynHandler(postController.patchPost));
postRouter.get('/', asynHandler(postController.readPost));
postRouter.get('/:postNum', asynHandler(postController.readOnePost));
postRouter.delete('/:postNum', asynHandler(postController.deleteOnePost));
postRouter.post('/upload', uploads.array('images',5), asynHandler(postController.uploadFileToS3));