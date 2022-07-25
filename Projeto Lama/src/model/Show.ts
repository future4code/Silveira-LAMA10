import { CustomError } from "../error/CustomError"

export class Show {
    constructor(
        private id: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string

    ) { }

    public getId = () => this.id
    public getWeekDay = () => this.weekDay
    public getStartTime = () => this.startTime
    public getEndTime = () => this.endTime
    public getBandId = () => this.bandId

    static toShowModel(show: any) {
        return new Show(show.id, show.weekDay, show.startTime, show.endTime, show.bandId);
    }
    static stringToDateValid(input: string): string {
        switch (input) {
            case "Friday":
                return "valid";
            case "Saturday":
                return "valid";
            case "Sunday":
                return "valid";
            default:
                throw new CustomError(409,"Enter a valid day, 'Friday', 'Saturday' or 'Sunday'");
        }
    }
}

export interface ShowInputDTO {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string
}
