import mongoose, {Schema} from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

export interface PostInterface {
    user: string;
    storeName: string;
    grade: number;
    img: string[];
    review: string;
    city: string;
    country: string;
    address: string;
    price: number;
    like: string[];
    lat: number;
    lng: number;
    foodType: string[];
    mood: string[];
    postNum: number;
}   

export const PostSchema = new Schema<PostInterface>({
    user: {
        type: String,
        required: true
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
        required: true
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
    price: {
        type: Number,
        required: true
    },
    like: {
        type: [String],
        required: true
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
}
)
PostSchema.plugin(autoIncrement.plugin, {
    model: 'PostSchema',
    field: 'postNum',
    startAt: 1,
    increment: 1
})
