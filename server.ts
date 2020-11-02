import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter  from './routes/user';
import postRouter from './routes/post';
import donationRouter from './routes/donation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/donation', donationRouter);

// mongodb connector
mongoose.connect(process.env.MONGOURI ?? '', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, err => {
    if(err) throw err;

    console.log('database connected');
});

// listen on port
app.listen(PORT, () => {
    console.log(`Rest api connected on http://localhost:${PORT}`);
});
