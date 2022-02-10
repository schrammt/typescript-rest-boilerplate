import { Request, Response } from "express";
import { Base as BaseController } from "./base";
import * as Dao from "../db/dao";
import * as Model from "../model";

export class User extends BaseController {

    constructor(dao: Dao.Interface<Model.Identifiable>) {
        super(dao);
    }

    public listUsers(req: Request, res: Response): void {
        
        const data = this.dao.read();

        res.json(data);
    }

    public getUser(req: Request, res: Response): void {
        res.json({ name: `William T. Kirk` });
    }
}