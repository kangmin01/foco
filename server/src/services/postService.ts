import { postModel, postModelType } from "../models";
import { PostInterface } from "../models/schemas/post";
import { whereCity, 
    whereCountry, 
    Diction, 
    whereFoodType, 
    whereMood } from "../function";


class PostServie {
    private Post: postModelType;

    constructor(postModel: postModelType) {
        this.Post =postModel;
    }

    //게시글 등록
    async createPost(postInfo: PostInterface) {
        const {
            storeName,
            grade,
            img,
            review,
            city,
            country,
            address,
            likeCount,
            likeUsers,
            lat,
            lng,
            foodType,
            mood
        } = postInfo;
        return await this.Post.create(postInfo);
    }

    //게시글 수정
    async patchPost(postNum: any, postInfo: PostInterface) {
        return await this.Post.findOneAndUpdate({postNum}, { $set: postInfo}).exec();
    }

    //게시글 가져옴
    async readPost(someObject: any) {
        let query: Diction = {};
        query = whereCity(someObject, query);
        query = whereCountry(someObject, query);
        query = whereMood(someObject, query);
        query = whereFoodType(someObject, query);
        
        return await this.Post.find(query).sort({likeCount: -1});
    }

    //한 게시글 가져옴
    async readOnePost(postNum: any) {
        return await this.Post.findOne({postNum}).exec();
    }
    
    //한 게시물 삭제
    async deleteOnePost(postNum: any) {
        return await this.Post.deleteOne({postNum}).exec();
    }

    //좋아요 +1
    async likePlusPost(postNum: any, userNum: any) {
        return await this.Post.findOneAndUpdate(
            {postNum}, 
            {$inc: {likeCount: 1},
            $push: {likeUsers: userNum}}
            ,{new: true,
            select: 'likeCount'}).exec();
    }
    //좋아요 -1
    async likeMinusPost(postNum: any, userNum: any) {
        return await this.Post.findOneAndUpdate(
            {postNum}, 
            {$inc: {likeCount: -1},
            $pull: {likeUsers: userNum}}
            ,{new: true,
            select: 'likeCount'}).exec();
    }
    //글 좋아요 수
    async getlikeCount(postNum: any) {
        return await this.Post.findOne({postNum}, {likeCount: 1});
    }
}

const postService = new PostServie(postModel);

export { postService };