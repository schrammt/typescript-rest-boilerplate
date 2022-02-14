import { Request, Response } from "express";
import { Base as BaseController } from "./base";
import { User as UserEntity } from "../entity";
import faker from "@faker-js/faker";
import { Repository } from "typeorm";
import { Database } from "../db/db";
import { validate } from "class-validator";


export interface UserRequest<T> extends Request {
    body: T;
}

/**
 * TODO: implement error handling
 */
export class User extends BaseController {

    protected repository?: Repository<UserEntity>;

    constructor() {
        super();
    }

    /**
     * List all users
     * 
     * TODO: implement pagination support
     * 
     * @param req Request
     * @param res Response
     */
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        let repository = await this.getRepository();
        let users = await repository.find();

        res.json(users);
    }

    /**
     * Get one single user
     * 
     * @param req Request
     * @param res Response
     * 
     * @returns void
     */
    public async getSingleUser(req: Request, res: Response): Promise<void> {
        let id = req.params.id;
        let repository = await this.getRepository();
        let user = await repository.findOne(id);
        if (!user) {
            this.sendNotFound(res);
            return;
        }
        res.json(user);
    }

    /**
     * Create a user
     * 
     * @param req Request
     * @param res Response
     * 
     * @returns void
     */
    public async createUser(req: UserRequest<UserEntity>, res: Response): Promise<void> {
        let repository = await this.getRepository();

        if (!req.body) {
            this.sendBadRequest(res);
            return;
        }

        let reqUser: UserEntity = req.body;
        let user = new UserEntity();
        user.email = reqUser.email;
        user.name = reqUser.name;        

        const errors = await validate(user);

        if (errors.length > 0) {
            this.sendBadRequest(res, JSON.stringify(errors));
            return;
        }

        await repository.save(user);
        res.status(201).json(user);
    }

    /**
     * Update a user
     * 
     * @param req Request
     * @param res Response
     * 
     * @returns void
     */
    public async updateUser(req: UserRequest<UserEntity>, res: Response): Promise<void> {
        let id = req.params.id;
        let repository = await this.getRepository();
        let user = await repository.findOne(id);
        if (!user) {
            this.sendNotFound(res);
            return;
        }

        let reqUser: UserEntity = req.body;
        user.email = reqUser.email ?? user.email;
        user.name = reqUser.name ?? user.name;

        const errors = await validate(user);

        if (errors.length > 0) {
            this.sendBadRequest(res, JSON.stringify(errors));
            return;
        }
        
        await repository.save(user);

        res.status(200).json(user);
    }

    /**
     * Delete a user
     * 
     * @param req Request
     * @param res Response
     * 
     * @returns void
     */
    public async deleteUser(req: Request, res: Response): Promise<void> {
        let id = req.params.id;
        let repository = await this.getRepository();
        let user = await repository.findOne(id);
        if (!user) {
            this.sendNotFound(res);
            return;
        }

        repository.delete(user);

        res.status(204).end();
    }

    /**
     * Get the userRepository
     * 
     * @returns Repository<UserEntity>
     */
    protected async getRepository(): Promise<Repository<UserEntity>> {
        if (!this.repository) {
            let con = await Database.getConnection();
            this.repository = con.getRepository(UserEntity);
        }

        return this.repository;
    }

    /**
     * Fill the userRepository with some fakeUsers
     * 
     * @param amount 
     * 
     * @returns void
     */
    public async seedUsers(amount: number): Promise<void> {
        let repository = await this.getRepository();
        for (let i = 0; i < amount; i++) {
            let user = new UserEntity();
            user.email = faker.internet.email();
            user.name = faker.name.findName();
            await repository.save(user);
        }
    }
}