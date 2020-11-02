import express from 'express';

import auth from '../middleware/auth';
import {
    updatePost,
    removePost,
    addPost,
    getPosts
} from '../controllers/post';
const router = express.Router();


router.route('/')
        .post(auth, addPost)
        .get(auth, getPosts);


router.route('/:id')
        .put(auth, updatePost)
        .delete(auth, removePost);

export default router;