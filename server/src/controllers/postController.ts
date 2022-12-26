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
    likePlusPost: AsyncRequestHandler;
    likeMinusPost: AsyncRequestHandler;
    getlikeCount: AsyncRequestHandler;
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
        const someObject = req.query;
        const posts = await postService.readPost(someObject);
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
    },

    async likePlusPost(req, res) {
        const {postNum} = req.params;
        const {userNum} = req.params;
        const post = await postService.likePlusPost(postNum, userNum);
        res.json(post);
    },
    async likeMinusPost(req, res) {
        const {postNum} = req.params;
        const {userNum} = req.params;
        const post = await postService.likeMinusPost(postNum, userNum);
        res.json(post);
    },
    async getlikeCount(req, res) {
        const {postNum} = req.params;
        const likeCount = await postService.getlikeCount(postNum);
        res.json(likeCount)
    }
}