import { postModel, postModelType } from "../models";
import { PostInterface } from "../models/schemas/post";

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
            country,
            address,
            price,
            like,
            lat,
            lng,
            foodType,
            mood
        } = postInfo;
        return await this.Post.create(postInfo);
    }

    //게시글 수정
    async patchPost(_id: string, postInfo: PostInterface) {
        return await this.Post.findOneAndUpdate({_id}, { $set: postInfo}).exec();
    }
    
    //전체 게시글 가져옴, 도시별, 나라별로 가져옴
    async readPost(city?: any, country?: any) {
        if ((typeof city) === "string") {
            return await this.Post.find({city});
        }
        else if ((typeof country) === "string"){
            return await this.Post.find({country});
        }
        else {
            return await this.Post.find();
        }
    }

    //한 게시글 가져옴
    async readOnePost(_id: string) {
        return await this.Post.findOne({_id}).exec();
    }
    
    //한 게시물 삭제
    async deleteOnePost(_id: string) {
        return await this.Post.deleteOne({_id}).exec();
    }
}

const postService = new PostServie(postModel);

export { postService };