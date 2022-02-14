import { Response } from "express";

export abstract class Base {

    protected sendNotFound(res: Response): void {
        res.status(404).end();
    }

    protected sendBadRequest(res: Response, errorMessage?: string): void {
        if (errorMessage) {
            res.set("X-ERROR-MESSAGE", errorMessage);
        }
        res.status(400).end();
    }
}