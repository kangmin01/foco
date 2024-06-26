import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next?: NextFunction,
    ...arg: any
) => Promise<any>;

export type ErrorType = 'FORBIDDEN' | 'NOTFOUND' | 'SERVERERROR' | 'BADREQUEST' | 'RESPONSE';