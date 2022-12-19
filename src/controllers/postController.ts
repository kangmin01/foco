import { PostInterface } from "../models/schemas/post";
import { postService } from "../services"
import { AsyncRequestHandler } from '../types';

interface postControllerInterface {
    postPost: AsyncRequestHandler;
    patchPost: AsyncRequestHandler;
    readPost: AsyncRequestHandler;
    readOnePost: AsyncRequestHandler;
    deleteOnePost: AsyncRequestHandler;
    readForCityPost: AsyncRequestHandler;
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
        const posts = await postService.readPost();
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
    async readForCityPost(req, res) {
        const city = req.query.city;
        const posts = await postService.readForCityPost(city);
        res.json(posts);
    }
    
}