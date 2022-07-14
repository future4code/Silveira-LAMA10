export class Band {
    constructor(
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string,

    ) { }

    public getId = () => this.id
    public getName = () => this.name
    public getGenre = () => this.genre
    public getResponsible = () => this.responsible


    static toBandModel(band: any) {
        return new Band(band.id, band.name, band.genre, band.responsible);
    }
}

export interface BandInputDTO {
    name: string;
    genre: string;
    responsible: string    
}


