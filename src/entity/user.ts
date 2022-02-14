import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
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
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name?: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email?: string;
}
