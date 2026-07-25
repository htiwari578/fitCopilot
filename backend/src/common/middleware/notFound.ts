import { NextFunction , Request , Response } from "express";
import { AppError } from "../errors/AppErros";

export const notFound = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`,
            404
        )
    );
};

