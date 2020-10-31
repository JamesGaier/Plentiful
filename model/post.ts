import mongoose, { Document, Model, Schema } from 'mongoose';
import { UserI } from './user';

export interface PostI extends Document {
    by: UserI,
    body: String,
    backers: Array<UserI>
}

interface PostM extends Model<PostI> {
}

const postSchema = new mongoose.Schema({
    by: {type: Schema.Types.ObjectId, ref: 'User'},
    body: {
        required: true
    },
    backers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
const Post =  mongoose.model<PostI, PostM>('Post', postSchema);

export { Post };