import { bookmarkModel, bookmarkModelType, postModel, postModelType } from '../models';
import { BookmarkInterface } from '../models/schemas/bookmark';
import { whereCity, 
    whereCountry, 
    Diction, 
    whereFoodType, 
    whereMood } from "../function";

class BookmarkService {
    private Bookmark: bookmarkModelType;
    private Post: postModelType;

    // 의존성 주입
    constructor(bookmarkModel: bookmarkModelType, postModel: postModelType) {
    this.Bookmark = bookmarkModel;
    this.Post =postModel;
    }

    private async isBookmarked(
    bookmarkInfo: BookmarkInterface
    ): Promise<boolean> {
    const isBookmarked = await this.Bookmark.findOne(bookmarkInfo);
    return !isBookmarked;
}
    //북마크 생성
    async createBookmark(bookmarkInfo: BookmarkInterface) {
    const isBookmarked = await this.isBookmarked(bookmarkInfo);
    if (!isBookmarked) {
        throw new Error('이미 찜한 글입니다.');
    }
    return await this.Bookmark.create(bookmarkInfo);

}
    //유저 북마크에 저장된 글 가져오기(쿼리줄 수 있음)
    async findPostBookmarkedByUserNum(userNum: any, someObject: any) {
        let query: Diction = {};
        query = whereCity(someObject, query);
        query = whereCountry(someObject, query);
        query = whereMood(someObject, query);
        query = whereFoodType(someObject, query);

        const bookmarks = await this.Bookmark.find({userNum},  { postNum: 1, _id: 0 });
        const postNums = bookmarks.map(bookmark => bookmark.postNum); 
        return await this.Post.find({postNum: {$in: postNums}}).find(query);
    }

    //북마크 하나 삭제
    async deleteBookmark(bookmarkInfo: BookmarkInterface) {
    return await this.Bookmark.findOneAndDelete(bookmarkInfo);
}
}

const bookmarkService = new BookmarkService(bookmarkModel, postModel);

export { bookmarkService };