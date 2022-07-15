import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";
import userBusiness from "../business/UserBusiness";


export class UserController {


    public signup = async (req: Request, res: Response) => {
        try {

            const { email, name, password, role } = req.body
            const input: UserInputDTO = {
                email,
                name,
                password,
                role
            }

            const token = await userBusiness.createUser(input);

            res.status(201).send({ token });

        } catch (error: any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });

        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    public login = async (req: Request, res: Response) => {

        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };


            const token = await userBusiness.login(loginData);

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
export default new UserController()