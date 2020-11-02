import { Request, Response } from 'express';

import Donation, { DonationI, DonationDoc } from '../model/donation';
import User from '../model/user';

const toDonation = (donation: any) => {
    return <DonationI>(<unknown>donation);
}

export const addDonation = (req: Request, res: Response) => {
    const donation: DonationI = toDonation(req.body);

    const by = (<any>req).user.id

    const newDonation = Donation.build(donation);

    newDonation.save();

    User.findById(by)
            .then(user => {
                user?.donations?.push(newDonation);
                user?.save();
                res.json(newDonation);
            })
            .catch(err => res.json(err));

};

export const removeDonation = (req: Request, res: Response) => {
    const { id:donationId } = req.params;

    Donation.findByIdAndDelete(donationId)
                .then(donation => {
                    const userId = (<any>req).user.id;
                    User.findById(userId)
                            .then(user => {
                                (<DonationDoc>(<any>user?.donations).pull({_id: donationId}));
                                user?.save();
                                res.json(donation);
                            })
                            .catch(err => {
                                res.json(err);
                            })
                })
                .catch(err => {
                    res.status(400).json(err);
                })
};

export const updateDonation = (req: Request, res: Response) => {
    const { id } = req.params;
    const body: Partial<DonationI> = toDonation(req.body);

    Donation.findByIdAndUpdate(id, body)
                .then(() => {
                    res.json(body);
                })
                .catch(err => {
                    res.json(err);
                })
};

export const getDonations = (req: Request, res: Response) => {
    const user = (<any>req).user;

    User.findById(user.id)
            .select('-password')
            .populate('donations')
            .then(user => {
                res.json(user?.donations);
            })
            .catch(err => {
                res.json(err);
            })
};