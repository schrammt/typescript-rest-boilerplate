import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *           example: 0
 *         name:
 *           type: string
 *           description: The user name
 *           example: Danny Swift
 *         email:
 *           type: string
 *           description: Email
 *           example: danny.swift@gmail.com
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name?: string;

    @Column()
    email?: string;
}
