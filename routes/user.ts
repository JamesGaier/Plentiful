import express from 'express';


import { createUser, login } from '../controllers/user';

const router: express.Router = express.Router();


router.post('/', createUser);

router.post('/login', login);

export default router;