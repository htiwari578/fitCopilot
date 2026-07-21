export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;


    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    

    //maintain proper prototype chain for custom error classes
    Object.setPrototypeOf(this, new.target.prototype);

    //capture stack trace for the error
    Error.captureStackTrace(this);
}
}