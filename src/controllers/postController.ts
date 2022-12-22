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
        const { id } = req.params;
        const newInfo: PostInterface = req.body;
        const post = await postService.patchPost(id, newInfo);
        res.json(post);
    },
    async readPost(req, res) {
        const city = req.query.city;
        const country = req.query.country;
        const posts = await postService.readPost(city, country);
        res.json(posts);
    },
    async readOnePost(req, res) {
        const { id } = req.params;
        const post = await postService.readOnePost(id);
        res.json(post);
    },
    async deleteOnePost(req, res) {
        const { id } = req.params;
        const post = await postService.deleteOnePost(id);
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