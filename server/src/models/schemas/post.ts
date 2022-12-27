import mongoose, {Schema} from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

export interface PostInterface {
    email: string;
    storeName: string;
    grade: number;
    img: string[];
    review: string;
    city: string;
    country: string;
    address: string;
    likeCount: number;
    likeUsers: number[];
    lat: number;
    lng: number;
    foodType: string[];
    mood: string[];
    postNum: number;
}   

export const PostSchema = new Schema<PostInterface>({
    email: {
        type: String,
        required: true,
        ref: 'user'
    },
    storeName: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    img: {
        type: [String],
        required: false
    },
    review: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,        
    },
    likeUsers: {
        type: [Number]
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    foodType: {
        type: [String]
    },
    mood: {
        type: [String],
    },
    postNum: {
        type: Number,
        default: 0
    }

    
},
{
    timestamps: true,
    collection: 'post'
}
)
PostSchema.plugin(autoIncrement.plugin, {
    model: 'PostSchema',
    field: 'postNum',
    startAt: 1,
    increment: 1
})
