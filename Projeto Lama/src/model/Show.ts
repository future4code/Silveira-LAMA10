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
    // static numberToDateValid(startTime: number, endTime:number ):string {
    //     switch (startTime ) {
    //         case startTime <08 :
    //             return ;
    //         case "ADMIN":
    //             return ;
    //         default:
    //             throw new Error("Invalid user role");
    //     }
    // }
}

export interface ShowInputDTO {
    weekDay: string,
    startTime: number,
    endTime:number,
    bandId:string    
}
