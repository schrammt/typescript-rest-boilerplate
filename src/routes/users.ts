import express, { Router, Request, Response } from "express";
import * as Controller from "../controller";
import * as Db from "../db";
import * as Dao from "../db/dao";
import * as Model from "../model";

const seed = Model.User.createSeed(100);
const DaoUser = Dao.User;

export const userRouter: Router = express.Router();
const dbAdapter: Db.AdapterInterface = new Db.Memory(seed);
const userDao: Dao.Interface<Model.User.Interface> = new DaoUser(dbAdapter);
const userController = new Controller.User(userDao);

userRouter.get("/", (req: Request, res: Response) => {
    userController.listUsers(req, res);
});
userRouter.get("/:id", userController.getUser)