import { PostInterface } from "../models/schemas/post";
import { postService } from "../services"
import { AsyncRequestHandler } from '../types';

interface postControllerInterface {
    postPost: AsyncRequestHandler;
    patchPost: AsyncRequestHandler;
    readPost: AsyncRequestHandler;
    readOnePost: AsyncRequestHandler;
    deleteOnePost: AsyncRequestHandler;
    uploadFileToS3: AsyncRequestHandler;
}

export const postController: postControllerInterface = {
    async postPost(req, res) {
        const post = await postService.createPost(req.body);
        res.json({post});
    },
    async patchPost(req, res) {
        const { postNum } = req.params;
        const newInfo: PostInterface = req.body;
        const post = await postService.patchPost(postNum, newInfo);
        res.json(post);
    },
    async readPost(req, res) {
        const country = req.body.country;
        const city = req.body.city;
        const mood = req.body.mood;
        const foodType = req.body.foodType;
        const posts = await postService.readPost(country, city, mood, foodType);
        res.json(posts);
    },
    async readOnePost(req, res) {
        const { postNum } = req.params;
        const post = await postService.readOnePost(postNum);
        res.json(post);
    },
    async deleteOnePost(req, res) {
        const { postNum } = req.params;
        const post = await postService.deleteOnePost(postNum);
        res.json(post);
    },
    async uploadFileToS3(req, res){
        if (!req.files) return res.status(400);
        const fileData: any = req.files;
        const ret: string[] = fileData.map((value: any)=> value.location);
        try {
            res.send(ret);
        } catch (error){
            console.log(error);
        }
    }
}