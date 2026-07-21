import {config} from "dotenv";

import {z} from "zod";

config();

//define the schema for environment variables
const envSchema = z.object({
    NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

    PORT: z.coerce.number().default(7000),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    JWT_ACCESS_TOKEN_SECRET: z
    .string().min(10, "JWT_ACCESS_TOKEN_SECRET is required"),

    JWT_REFRESH_TOKEN_SECRET: z
    .string().min(10, "JWT_REFRESH_TOKEN_SECRET is required"),

    GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),


});

//alidate the environment variables against the schema
const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
    console.error("Invalid environment variables");
    console.log(parsed.error.format());
    process.exit(1);
}

//export the validated environment variables
export const env = parsed.data;