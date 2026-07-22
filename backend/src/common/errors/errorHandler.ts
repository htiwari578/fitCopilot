import {NextFunction , Request, Response} from 'express';
import { AppError } from './AppErros';
import { logger } from '../logger/logger';
import { env } from '../config/env';



export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(err);

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: 
         env.NODE_ENV === "production" ? "Internal server error" : err.message
    });
}