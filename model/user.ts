import { NextFunction } from 'express-serve-static-core';
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { DonationI } from './donation';
import { PostI } from './post';
export interface UserI {
    name: string,
    email: string,
    password: string
    donations?: Array<DonationI>
    posts?: Array<PostI>
}
export interface UserDoc extends UserI, Document {
}
export interface UserM extends Model<UserDoc> {
    build(attr: UserI): UserDoc
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

userSchema.pre<UserDoc>('save', async function(next) {
    try {
        if(this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch(err) {
        next(err);
    }
});


userSchema.statics.build = (attr: UserI) => {
    return new User(attr);
};

const User = mongoose.model<UserDoc, UserM>('User', userSchema);

export default User;