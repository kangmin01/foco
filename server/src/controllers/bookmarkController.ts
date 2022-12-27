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
        const someObject = req.query;
        const bookmarks = await bookmarkService.findPostBookmarkedByUserNum(userNum, someObject);
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
