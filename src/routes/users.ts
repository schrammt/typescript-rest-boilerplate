import express, { Router, Request, Response } from "express";
import * as Controller from "../controller";

export const userRouter: Router = express.Router();
const userController = new Controller.User();

/**
 * @openapi
 * /user:
 *   get:
 *     description: Returns all users from system
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", async (req: Request, res: Response) => {
    await userController.listUsers(req, res);
});

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
    await userController.getUser(req, res);
})