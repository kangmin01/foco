import { Router } from 'express';
import { bookmarkController } from '../controllers';
import { asynHandler } from '../utils/asynHandler';

export const bookmarkRouter = Router();

bookmarkRouter.post('/',asynHandler(bookmarkController.postBookmark));
bookmarkRouter.get('/:email',asynHandler(bookmarkController.getBookmark));
bookmarkRouter.delete('/',asynHandler(bookmarkController.deleteOneBookmark));
