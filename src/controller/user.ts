import { Request, Response } from "express";
import { Base as BaseController } from "./base";
import { User as UserEntity } from "../entity";
import faker from "@faker-js/faker";
import { Repository } from "typeorm";
import { Database } from "../db/db";

export class User extends BaseController {

    protected repository?: Repository<UserEntity>;

    constructor() {
        super();
    }

    public async listUsers(req: Request, res: Response) {
        let repository = await this.getRepository();
        let users = await repository.find();

        res.json(users);
    }

    public async getUser(req: Request, res: Response) {
        let id = req.params.id;
        let repository = await this.getRepository();
        let user = await repository.findOne(id);
        if (!user) {
            res.status(404).end();
            return;
        }
        res.json(user);
    }

    protected async getRepository() {
        if (!this.repository) {
            let con = await Database.getConnection();
            this.repository = con.getRepository(UserEntity);
        }

        return this.repository;
    }

    public async seedUsers(amount: number) {
        let repository = await this.getRepository();
        for (let i = 0; i < amount; i++) {
            let user = new UserEntity();
            user.email = faker.internet.email();
            user.name = faker.name.findName();
            await repository.save(user);
        }
    }
}