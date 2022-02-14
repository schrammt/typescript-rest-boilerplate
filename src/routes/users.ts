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
    await userController.getAllUsers(req, res);
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
 *       404:
 *         description: User not found
 *       200:
 *         description: A single users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
    await userController.getSingleUser(req, res);
});

/**
 * @openapi
 * 
 * /user/{id}:
 *   put:
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *       - name: user
 *         in: body
 *         required: true
 *         description: Fields for the user resource
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid user object
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put("/:id", async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
});

/**
 * @openapi
 * 
 * /user:
 *   post:
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *       - name: user
 *         in: body
 *         required: true
 *         description: Fields for the user resource
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       400:
 *         description: Invalid user object
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post("/", async (req: Request, res: Response) => {
    await userController.createUser(req, res);
});

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User successfully deletetd, no content returns
 *       404:
 *         description: User not found
 */
userRouter.delete("/:id", async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
});