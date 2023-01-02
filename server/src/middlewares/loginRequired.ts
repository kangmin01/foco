import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export async function loginRequired(
    req: Request,
    res: Response,
    next: NextFunction
    ) {

    const tokenType = req.headers.authorization?.split(' ')[0]; // acc || ref
    const Token = req.headers.authorization?.split(' ')[1];

    if (!Token || Token === 'null') {
        next(new Error('로그인이 필요합니다.'));
        return
    }

    if (!(tokenType === 'acc' || tokenType === 'ref')) {
        next(new Error('정상적인 토큰이 아닙니다'));
    }

        try {
            const jwtDecoded = jwt.verify(Token, secretKey);
            const email = (<{ email: string}>jwtDecoded).email;
            const userNum = (<{ userNum: number}>jwtDecoded).userNum;
            req.body.email = email;
            req.body.userNum = userNum;
            next();
            } catch (error) {
                next(error);
            }
        }