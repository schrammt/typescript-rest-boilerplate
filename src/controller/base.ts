import { Response } from "express";

export abstract class Base {

    protected sendNotFound(res: Response): void {
        res.status(404).end();
    }

    protected sendBadRequest(res: Response): void {
        res.status(400).end();
    }
}