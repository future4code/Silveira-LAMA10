import { Request, Response } from "express";
import bandBusiness from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";

export class BandController {

     public bandRegister = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization as string
            const { name, genre, responsible } = req.body
            const input: BandInputDTO = {
                name,
                genre,
                responsible
            }

            await bandBusiness.registerBand(input, token);

            res.status(201).send({ message: "Banda registrada com sucesso" });

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
            const token: string = req.headers.authorization as string
            const { id, name } = req.body
            
            const band = await bandBusiness.getBand(token,name,id)


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

export default new BandController()