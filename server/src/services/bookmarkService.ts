import { bookmarkModel, bookmarkModelType } from '../models';
import { BookmarkInterface } from '../models/schemas/bookmark';
import { postService } from './postService';

class BookmarkService {
    private Bookmark: bookmarkModelType;

    // 의존성 주입
    constructor(bookmarkModel: bookmarkModelType) {
    this.Bookmark = bookmarkModel;
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
    async getCase(key: any) {
        const bookmark = await postService.readOnePost(key);
        return new Promise((resolve, reject)=>{
            resolve(bookmark);
            reject('북마크 가져오기 실패');
        })
    }
    //북마크 가져오기
    async findBookmark(email: any) {

    const bookmark = await this.Bookmark.find({email},  { postNum: 1, _id: 0 });
    return await Promise.all(
        bookmark.map((list) => {
            return this.getCase(list.postNum);
        })
        
    )
}

    //북마크 하나 삭제
    async deleteBookmark(bookmarkInfo: BookmarkInterface) {
    return await this.Bookmark.findOneAndDelete(bookmarkInfo);
}
}

const bookmarkService = new BookmarkService(bookmarkModel);

export { bookmarkService };