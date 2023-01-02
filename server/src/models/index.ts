import { Model, model } from "mongoose";
import { PostSchema, PostInterface } from "./schemas/post";
import { UserSchema, UserInterface } from "./schemas/user";
import { BookmarkSchema, BookmarkInterface } from './schemas/bookmark';

interface ModelIdentifierInterface {
    post: string;
    user: string;
    bookmark: string;
}

export const ModelIdentifier: ModelIdentifierInterface ={
    post: 'post',
    user: 'user',
    bookmark: 'bookmark'
};

const postModel = model<PostInterface>(ModelIdentifier.post, PostSchema);
const userModel = model<UserInterface>(ModelIdentifier.user, UserSchema);
const bookmarkModel = model<BookmarkInterface>(ModelIdentifier.bookmark,BookmarkSchema);

type postModelType = Model<PostInterface>;
type userModelType = Model<UserInterface>;
type bookmarkModelType = Model<BookmarkInterface>;

export {
    postModel, postModelType,
    userModel, userModelType,
    bookmarkModel, bookmarkModelType
}