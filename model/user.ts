import mongoose, { Document, Model, Schema } from 'mongoose';
import { DonationI } from './donation';
import { PostI } from './post';
export interface UserI extends Document {
    name: String,
    email: String,
    password: String
    donations: DonationI
    posts: PostI
}
export interface UserM extends Model<UserI> {
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    donations: [{type: Schema.Types.ObjectId, ref: 'Donation'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

userSchema.statics.build = (attr: UserI) => {
    return new User(attr);
};

const User = mongoose.model<UserI, UserM>('User', userSchema);

export { User };