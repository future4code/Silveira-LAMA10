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
                throw new CustomError(422," Fill up all the fields 'weekDay', 'startTime', 'endTime' and 'bandId'");
            }
            if (!token) {
                throw new CustomError(422,"Insert a token in the headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new CustomError(401, "Token invalid")
            }
            if (tokenData.role !== "ADMIN") {
                throw new CustomError(401, "Your credentials are not valid for this task");
            }
            // if (weekDay !== "Friday" || "Saturday" || "Sunday") {
            //     throw new CustomError(401,"Enter a valid day, 'Friday', 'Saturday' or 'Sunday'")
            // }



            // if (startTime <08){
            //     throw new Error("Invalid start time")

            // }
            // if (startTime >= 23){
            //     throw new Error("Invalid start time")

            // }
            // if (endTime <08){
            //     throw new Error("Invalid end time")

            // }
            // if (endTime > 23){
            //     throw new Error("Invalid end time")

            // }
          
            // const showFromDB = await this.showDatabase.getShowFromDay(weekDay);

            // for (let i = 0; i < showFromDB.length; i++) {
            //     if (showFromDB.filter((show) => {
            //         show.getStartTime() === startTime
            //     })) {
            //         throw new Error("Show already registered on this date and time!");
            //     }
            // }

            const id = this.idGeneratator.generate();

            const newShow = new Show(id, weekDay, startTime, endTime, bandId)

            await this.showDatabase.createShow(newShow);


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    public getAllShows = async (day: string) => {
        try {

            // if (day !== "Friday" || "Saturday" || "Sunday") {
            //     throw new CustomError(401,"Enter a valid day, 'Friday', 'Saturday' or 'Sunday'")
            // }

            const show = await this.showDatabase.getShowFromDay(day)

            if (show.length <1) {
                throw new CustomError(404,`Could not find the shows of the ${day}`);
            }

            return show

        }catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }


    }
}     
export default new ShowBusiness(
    new ShowDatabase(),
    new Authenticator(),
    new IdGenerator()
)    