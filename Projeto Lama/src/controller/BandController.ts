import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";



export class BandController {

    constructor(
        private bandBusiness: BandBusiness
    ) { }

    public bandRegister = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization as string
            const { name, genre, responsible } = req.body
            const input: BandInputDTO = {
                name,
                genre,
                responsible
            }

            await this.bandBusiness.registerBand(input, token);

            res.status(200).send({ message: "Banda registrada com sucesso" });

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

    public getBand = async (req: Request, res: Response) => {

        try {

            const { id, name } = req.params

            const band = await this.bandBusiness.getBand(id,name)


            res.status(200).send({ band });

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