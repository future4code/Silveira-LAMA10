import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError } from "../error/CustomError";
import { Show, ShowInputDTO } from "../model/Show";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";


export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public addShow = async (show: ShowInputDTO, token: string) => {

        try {
            const { weekDay, startTime, endTime, bandId } = show;

            if (!weekDay || !startTime || !endTime || !bandId) {
                throw new CustomError(422, " Fill up all the fields 'weekDay', 'startTime', 'endTime' and 'bandId'");
            }
            if (!token) {
                throw new CustomError(422, "Insert a token in the headers")
            }
            const weekdayValidation = Show.stringToDateValid(weekDay)

            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new CustomError(401, "Token invalid")
            }
            if (tokenData.role !== "ADMIN") {
                throw new CustomError(401, "Your credentials are not valid for this task");
            }

            if (startTime < 8) {
                throw new Error("Invalid start time")
            }
            if (startTime >= 23) {
                throw new Error("Invalid start time")
            }
            if (endTime < 8) {
                throw new Error("Invalid end time")
            }
            if (endTime > 23) {
                throw new Error("Invalid end time")
            }

            const showFromDB = await this.showDatabase.getShowFromDay(weekDay)
            console.log(showFromDB)

            const validateDay = showFromDB.filter((show: any) =>
                show.start_time <= startTime && show.end_time > startTime)
            if (validateDay.length > 0) {
                throw new CustomError(409, "Show already registered on this date and time!");

            }
            const id = this.idGeneratator.generate();

            const newShow = new Show(id, weekDay, startTime, endTime, bandId)

            await this.showDatabase.createShow(newShow);


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    public getAllShows = async (day: string) => {
        try {

            const weekdayValidation = Show.stringToDateValid(day)

            const show = await this.showDatabase.getShowFromDay(day)

            if (show.length < 1) {
                throw new CustomError(404, `Could not find the shows of the ${day}`);
            }

            return show

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }


    }
}
export default new ShowBusiness(
    new ShowDatabase(),
    new Authenticator(),
    new IdGenerator()
)    