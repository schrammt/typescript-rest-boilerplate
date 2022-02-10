'use strict';
import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, Express } from 'express';
import { userRouter } from './routes';

dotenv.config();

const app: Express = express();
const PORT: String|Number = process.env.PORT || 5000;

(async () => {
    try {
        console.log("RUN");
        app.get("/", (req: Request, res: Response) => {
            res.json({ message: `Welcome to the home page!` });
        });

        app.use("/api/v1/users", userRouter);

        app.listen(PORT, ()=>{
            console.log(`Server running on PORT ${ PORT }`);
        });
    } catch (error) {
        console.error(error);
    }
})()