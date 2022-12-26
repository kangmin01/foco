import { Schema } from 'mongoose';

export interface BookmarkInterface {
    postNum: Number;
    email: Schema.Types.String;
}

export const BookmarkSchema = new Schema<BookmarkInterface>(
{
    postNum: {
    type: Number,
    ref: 'post',
    required: true,
    },
    email: { 
    type: Schema.Types.String, 
    ref: 'user',
    required: true },
},
{
    timestamps: true,
}
);
