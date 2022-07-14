import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";
import UserBusiness from "../business/UserBusiness";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    async signup(req: Request, res: Response) {

        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }


            const token = await this.userBusiness.createUser(input);

            res.status(201).send({ token });

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async login(req: Request, res: Response) {

        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };


            const token = await this.userBusiness.login(loginData);

            res.status(200).send({ token });

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500).send({ message: error.message })
            } else {
                res.status(res.statusCode).send({ message: error.sqlMessage || error.message })
            }
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

}
// export default new UserController()