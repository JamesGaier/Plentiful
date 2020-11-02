import express from 'express';

import auth from '../middleware/auth';
import {
    addDonation,
    getDonations,
    removeDonation,
    updateDonation } from '../controllers/donation';

const router = express.Router();

router.route('/')
        .post(auth, addDonation)
        .get(auth, getDonations);

router.route('/:id')
        .delete(auth, removeDonation)
        .put(auth, updateDonation);

export default router;