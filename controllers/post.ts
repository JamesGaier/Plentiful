import { Request, Response } from 'express';
import Post, { PostI, PostDoc } from '../model/post';
import User, { UserDoc } from '../model/user';

const toPost = (body:any) => {
    return <PostI>(<unknown>body);
};

export const addPost = (req: Request, res: Response) => {
    const post: Omit<PostI, 'by'> = toPost(req.body);
    const userId = (<UserDoc>(<any>req).user).id;

    User.findById(userId)
            .then(user => {
                const newPost = Post.build({
                    by: userId,
                    body: post.body
                });

                newPost.save();

                user?.posts?.push(newPost);

                user?.save();

                res.json(newPost);
            })
};

export const removePost = (req: Request, res: Response) => {
    const { id:postId } = (<any>req).params;

    Post.findByIdAndDelete(postId)
            .then(post => {
                const { id:userId } = ((<any>req).user)
                User.findById(userId)
                    .then(user => {
                            (<PostDoc>(<any>user?.posts)?.pull({_id: postId}));

                            user?.markModified('posts');
                            user?.save();
                            res.json(post);
                        })
                        .catch(err => {
                            res.json(err);
                        })
            })
            .catch(err => {
                res.status(400).json(err);
            })
};

export const updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const body: Partial<PostI> = toPost(req.body);

    Post.findByIdAndUpdate(id, body)
            .then(() => {
                res.json(body);
            })
            .catch(err => {
                res.json(err);
            });

};

export const getPosts = (req: Request, res: Response) => {
    const { id:userId } = (<any>req).user;

    User.findById(userId)
            .select('-password')
            .populate('posts')
            .then(user => {
                res.json(user?.posts);
            })
            .catch(err => {
                res.json(err);
            })
};