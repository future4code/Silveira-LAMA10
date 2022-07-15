import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";


export default class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public addShow = async (show: ShowInputDTO, token: string) => {

        try {
            const { weekDay, startTime, endTime, bandId } = show;

            if (!weekDay || !startTime || !endTime || !bandId) {
                throw new Error(" Fill up all the fields 'weekDay', 'startTime', 'endTime' and 'bandId'");
            }
            if (!token) {
                throw new Error("Insert a token through the headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new Error("Token invalid")
            }
            if (tokenData.role !== "ADMIN") {
                throw new Error("Your credentials are not valid for this task");
            }
            if (weekDay !== "Friday" || "Saturday" || "Sunday") {
                throw new Error("Enter a valid day, 'Friday', 'Saturday' or 'Sunday'")
            }

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
          
            const showFromDB = await this.showDatabase.getShowFromDay(weekDay);

            for (let i = 0; i < showFromDB.length; i++) {
                if (showFromDB.filter((show) => {
                    show.getStartTime() === startTime
                })) {
                    throw new Error("Show already registered on this date and time!");
                }
            }

            const id = this.idGeneratator.generate();

            const newShow = new Show(id, weekDay, startTime, endTime, bandId)

            await this.showDatabase.registerShow(newShow);


        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    public getAllShows = async (day: string) => {
        try {

            if (day !== "Friday" || "Saturday" || "Sunday") {
                throw new Error("Enter a valid day, 'Friday', 'Saturday' or 'Sunday'")
            }

            const show = await this.showDatabase.getShowFromDay(day)

            if (!show) {
                throw new Error(`Could not find the shows of the ${day}`);
            }

            return show

        } catch (error: any) {
            throw new Error(error.message);
        }


    }
}        