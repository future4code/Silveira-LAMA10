import { Request, Response } from "express";
import showBusiness from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowInputDTO } from "../model/Show";

export class ShowController {

    public registerShow = async (req: Request, res: Response) => {
        try {
            const token: string = req.headers.authorization as string
            const { weekDay, startTime, endTime, bandId } = req.body
            const input: ShowInputDTO = {
                weekDay,
                startTime,
                endTime,
                bandId
            }

            await showBusiness.addShow(input, token);

            res.status(201).send({ message: "Show cadastrado com sucesso", input });

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

    public getAllShowsOfDay = async (req: Request, res: Response) => {

        try {

            const day = req.body.day

            const shows = await showBusiness.getAllShows(day)
            
            res.status(200).send({ shows });

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
export default new ShowController()