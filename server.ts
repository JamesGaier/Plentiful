import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { User, UserI, UserM } from './model/user';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURI ?? '', { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if(err) throw err;

    // const user = new UserM()
    const user = User.
    console.log('database connected');
});

app.listen(PORT, () => {
    console.log(`Rest api connected on http://localhost:${PORT}`);
});