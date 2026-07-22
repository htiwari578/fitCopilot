import dotenv from "dotenv";
import app from "./app";
import { env } from "./common/config/env";
import { logger } from "./common/logger/logger";

dotenv.config();



app.listen(env.PORT, ()=> {
    logger.info(`Server is running on http://localhost:${env.PORT}`);
});