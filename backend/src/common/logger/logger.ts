import winston from "winston";

import {env} from "../config/env";


const { combine, timestamp, printf, colorize, errors } = winston.format;

const logformat = printf(({level, message, timestamp, stack}) => {
    return stack
    ? `[${timestamp}] ${level}: ${stack}`
    : `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",

    format: combine(
        errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logformat
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: "HH:mm:ss" }),
                logformat
            )
        }),
    ]
});