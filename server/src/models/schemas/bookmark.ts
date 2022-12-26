import { Schema } from 'mongoose';

export interface BookmarkInterface {
    postNum: Number;
    userNum: Number;
}

export const BookmarkSchema = new Schema<BookmarkInterface>(
{
    postNum: {
    type: Number,
    ref: 'post',
    required: true,
    },
    userNum: { 
    type: Number, 
    ref: 'user',
    required: true },
},
{
    timestamps: true,
}
);
