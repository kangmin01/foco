import { Schema } from 'mongoose';

export interface BookmarkInterface {
    postNum: string;
    uid: string;
}

export const BookmarkSchema = new Schema<BookmarkInterface>(
{
    postNum: {
    type: Schema.Types.String,
    ref: 'post',
    required: true,
    },
    uid: { 
    type: Schema.Types.String, 
    ref: 'user',
    required: true },
},
{
    timestamps: true,
}
);
