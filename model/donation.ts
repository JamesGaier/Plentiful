import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { UserI } from './user';

export interface DonationI extends Document {
    amount: number,
    to: UserI // the id of the person donated to
}
interface DonationM extends Model<DonationI> {
}

const donationSchema = new mongoose.Schema({
    amount: {
        required: true
    },
    to: {type: Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model<DonationI, DonationM>('Donation', donationSchema);