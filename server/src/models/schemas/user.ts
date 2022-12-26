import mongoose, {Schema} from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

export interface UserInterface {
    email: string;
    name: string;
    password: string;
    country: string;
    img: string;
    refreshToken?: string;
    role: string;
    userNum: number;
    
}

export interface LoginInterface {
    email: string;
    password: string;
}

export const UserSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    userNum: {
        type: Number,
        default: 0
    }
    
},
{
    timestamps: true,
    collection: 'user'
}
)
UserSchema.plugin(autoIncrement.plugin, {
    model: 'UserSchema',
    field: 'userNum',
    startAt: 1,
    increment: 1
})
