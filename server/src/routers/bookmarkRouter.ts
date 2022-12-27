import { Router } from 'express';
import { bookmarkController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';

export const bookmarkRouter = Router();

bookmarkRouter.post('/',asynHandler(bookmarkController.postBookmark)); //lR
bookmarkRouter.get('/:userNum',asynHandler(bookmarkController.getBookmark)); //lR
bookmarkRouter.delete('/',asynHandler(bookmarkController.deleteOneBookmark)); //lR
