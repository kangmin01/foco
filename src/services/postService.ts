import { postModel, postModelType } from "../models";
import { PostInterface } from "../models/schemas/post";

interface Diction{
    [key: string]: any;
}
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
    async patchPost(postNum: any, postInfo: PostInterface) {
        return await this.Post.findOneAndUpdate({postNum}, { $set: postInfo}).exec();
    }
    
    //전체 게시글 가져옴, 도시별, 나라별로 가져옴
    async readPost(country?: any, city?: any, mood?: any, foodType?: any) {
        var query: Diction= {};
        //나라별로 조회
        if (country !== undefined && city === undefined) {
            query = {
                "country" : country
        }
    }   //나라 -> 도시별로 조회
        else if(country !== undefined && city !== undefined){
            query = {
                "country" : country,
                "city" : city
            }
            //나라 -> 도시별 -> mood & foodType으로 조회
            if (mood !== undefined && foodType !==undefined) {
                query = {
                    "country" : country,
                    "city" : city,
                    "mood" : mood,
                    "foodType" : foodType
                }
            }
            //나라 -> 도시별 -> mood만 입력
            else if(mood !== undefined && foodType === undefined) {
                query = {
                    "country" : country,
                    "city" : city,
                    "mood" : {$in : [mood]}
                }
            }
            //나라 -> 도시별 -> foodType만 입력
            else if(foodType !== undefined && mood === undefined) {
                query = {
                    "country" : country,
                    "city" : city,
                    "foodType" : {$in : [foodType]}
                }
            }
        }
        else return await this.Post.find().exec();
        return await this.Post.find(query).exec();
    }

    //한 게시글 가져옴
    async readOnePost(postNum: any) {
        return await this.Post.findOne({postNum}).exec();
    }
    
    //한 게시물 삭제
    async deleteOnePost(postNum: any) {
        return await this.Post.deleteOne({postNum}).exec();
    }
}

const postService = new PostServie(postModel);

export { postService };