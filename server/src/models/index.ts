import { Model, model } from "mongoose";
import { PostSchema, PostInterface } from "./schemas/post";
import { UserSchema, UserInterface } from "./schemas/user";

interface ModelIdentifierInterface {
    post: string;
    user: string;
}

export const ModelIdentifier: ModelIdentifierInterface ={
    post: 'post',
    user: 'user'  
};

const postModel = model<PostInterface>(ModelIdentifier.post, PostSchema);
const userModel = model<UserInterface>(ModelIdentifier.user, UserSchema);


type postModelType = Model<PostInterface>;
type userModelType = Model<UserInterface>;

export {
    postModel, postModelType,
    userModel, userModelType
}