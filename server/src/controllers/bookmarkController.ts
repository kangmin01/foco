import { BookmarkInterface } from './../models/schemas/bookmark';
import { bookmarkService } from '../services/bookmarkService';
import { AsyncRequestHandler } from '../types';

interface bookmarkControllerInterface {
    getBookmark: AsyncRequestHandler;
    postBookmark: AsyncRequestHandler;
    deleteOneBookmark: AsyncRequestHandler;
}

export const bookmarkController: bookmarkControllerInterface = {
    async postBookmark(req, res) {
        const { userNum } = req.body;
        const { postNum } = req.body;
        const bookmarkInfo: BookmarkInterface = {
            userNum,
            postNum,
        };
        const bookmark = await bookmarkService.createBookmark(bookmarkInfo);
        res.json(bookmark);
},

    async getBookmark(req, res) {
        const { userNum } = req.params;
        const bookmarks = await bookmarkService.findBookmark(userNum);
        res.json(bookmarks);
    },

    async deleteOneBookmark(req, res) {
        const { userNum } = req.body;
        const { postNum } = req.body;
        const bookmarkInfo: BookmarkInterface = {
            userNum,
            postNum,
        };
        const deleteOne = await bookmarkService.deleteBookmark(bookmarkInfo);
        res.json(deleteOne);
    },
    };
