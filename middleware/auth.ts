import { NextFunction } from 'express-serve-static-core';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET!);

        (<any>req).user = decoded;
        next();

    } catch(err) {
        res.status(400).json({msg: 'Token is not found'});
    }

}

export default auth;