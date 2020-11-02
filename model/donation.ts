import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { UserI } from './user';

export interface DonationI {
    amount: number,
    items?: Array<string>,
    to: UserI
    by: UserI
}

export interface DonationDoc extends DonationI, Document {}

interface DonationM extends Model<DonationDoc> {
    build(attr: DonationI): DonationDoc
}

const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    items: [String],
    to: {type: Schema.Types.ObjectId, ref: 'User'},
    by: {type: Schema.Types.ObjectId, ref: 'User'}
});

donationSchema.statics.build = (attr: DonationI) => {
    return new Donation(attr);
};

const Donation = mongoose.model<DonationDoc, DonationM>('Donation', donationSchema);

export default Donation;