import { postModel, postModelType } from "../models";
import { PostInterface } from "../models/schemas/post";
//import { ObjectId } from 'mongodb';

class PostServie {
    private Post: postModelType;

    constructor(postModel: postModelType) {
        this.Post =postModel;
    }

    //게시글 등록
    async createPost(postInfo: PostInterface) {
        const {
            user,
            storeName,
            grade,
            img,
            review,
            city,
            address,
            price,
            like,
            lat,
            lng
        } = postInfo;
        return await this.Post.create(postInfo);
    }

    //게시글 수정
    async patchPost(_id: string, postInfo: PostInterface) {
        return await this.Post.findOneAndUpdate({_id}, { $set: postInfo}).exec();
    }
    
    //게시글 가져옴
    async readPost() {
        return await this.Post.find();
    }

    //한 게시글 가져옴
    async readOnePost(_id: string) {
        return await this.Post.findOne({_id}).exec();
    }
    
    //한 게시물 삭제
    async deleteOnePost(_id: string) {
        return await this.Post.deleteOne({_id}).exec();
    }

    //게시글 도시별 조회
    async readForCityPost(city: any) {
        return await this.Post.find({city: city}).exec();
    }
}

const postService = new PostServie(postModel);

export { postService };