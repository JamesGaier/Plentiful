import mongoose, { Document, Model, Schema } from 'mongoose';
import { UserI } from './user';

export interface PostI {
    by: UserI,
    body: string,
    backers?: Array<UserI>
}
export interface PostDoc extends PostI, Document {
}
interface PostM extends Model<PostDoc> {
    build(attr: PostI): PostDoc
}

const postSchema = new mongoose.Schema({
    by: {type: Schema.Types.ObjectId, ref: 'User'},
    body: {
        type: String,
        required: true
    },
    backers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

postSchema.statics.build = (attr: PostI) => {
    return new Post(attr);
};

const Post =  mongoose.model<PostDoc, PostM>('Post', postSchema);

export default Post;