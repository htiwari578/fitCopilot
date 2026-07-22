import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./common/errors/errorHandler";
import { AppError } from "./common/errors/AppErros";

const app = express();

// Middleware
app.use(helmet());

//enable CORS for all routes
app.use(cors({
   
    origin: "*", // Later we'll replace this with frontend URL
    credentials: true,
  })
);

//parse JSON
app.use(express.json());

//parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

//http logger
app.use(morgan("dev"));

//routes

//global error handler
app.use(errorHandler);

//health check route
app.get("/health", (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "fitpilot backend is running successfully",
        status: "ok" 
    });
});

app.get("/error", () => {
    throw new AppError("testing AppError", 400);
});

export default app;
