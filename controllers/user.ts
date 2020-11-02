import { NextFunction } from 'express-serve-static-core';
import { Request, Response } from 'express';
import User, { UserI } from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*
* @route POST /api/user
* @desc to create a new user
* @access public
*/
export const createUser = (req: Request, res: Response) => {

    const body = <UserI>(<unknown>req.body);

    const user = User.findOne({email: body.email})
                        .then(user => {
                            if(user === null) {
                                const newUser = User.build({
                                    name: body.name,
                                    email: body.email,
                                    password: body.password
                                });
                                newUser.save()
                                        .then(user => {
                                            res.json(user);
                                        })
                                        .catch(err => {
                                            res.json(err);
                                        })
                            }
                            else {
                                res.status(400).json({msg: 'User already exists.'});
                            }
                        })
                        .catch(err => {
                            res.json(err);
                        })
};


/*
* @route GET /api/user
* @desc get the user
* @access Public
*/
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <Omit<UserI, 'name'>>(<unknown>req.body);

    User.findOne({email})
            .then(user => {
                if(user != null) {
                    bcrypt.compare(password, user.password)
                            .then((isMatch: boolean) => {
                                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

                                jwt.sign(
                                    {id: user.id},
                                    process.env.SECRET!,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        if(err) throw err;

                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email
                                            }
                                        })
                                    });
                                })
                                .catch(err => {
                                    res.status(400).json(err);
                                })
                            }
                            else {
                                res.json({msg: 'Username or password is incorrect.'});
                            }
                        })
            .catch(err => {
                res.status(200).json(err);
            })
};

