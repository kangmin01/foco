import { BookmarkInterface } from './../models/schemas/bookmark';
import { bookmarkService } from '../services';
import { AsyncRequestHandler } from '../types';

interface bookmarkControllerInterface {
    getBookmark: AsyncRequestHandler;
    postBookmark: AsyncRequestHandler;
    deleteOneBookmark: AsyncRequestHandler;
}

export const bookmarkController: bookmarkControllerInterface = {
    async postBookmark(req, res) {
        const { email } = req.body;
        const { postNum } = req.body;
        const bookmarkInfo: BookmarkInterface = {
            email,
            postNum,
        };
        const bookmark = await bookmarkService.createBookmark(bookmarkInfo);
        res.json(bookmark);
},

    async getBookmark(req, res) {
        const { email } = req.params;
        const bookmarks = await bookmarkService.findBookmark(email);
        res.json(bookmarks);
    },

    async deleteOneBookmark(req, res) {
        const { email } = req.body;
        const { postNum } = req.body;
        const bookmarkInfo: BookmarkInterface = {
            email,
            postNum,
        };
        const deleteOne = await bookmarkService.deleteBookmark(bookmarkInfo);
        res.json(deleteOne);
    },
    };
