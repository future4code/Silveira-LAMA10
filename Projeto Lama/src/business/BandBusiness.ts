import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../model/Band";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";


export default class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public registerBand = async (band: BandInputDTO, token: string) => {
        
        try {
            const  idVazio:string = ""
            const { name, genre, responsible } = band;
            if (!name || !genre || !responsible) {
                throw new Error(" Fill up all the fields 'name', 'genre' and 'responsible'");
            }
            if (!token) {
                throw new Error("Insira um token através do headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new Error("Token invalid")
            }
            if (tokenData.role !== "ADMIN") {
                throw new Error("Your credentials are not valid for this task");

            }
            const bandFromDB = await this.bandDatabase.getBandByNameOrId(name, idVazio);
            if (bandFromDB) {
                throw new Error("Band already exists!");
            }

            const id = this.idGeneratator.generate();

            const newBand = new Band(id, name, genre, responsible)

            await this.bandDatabase.createBand(newBand);


        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    public getBand = async (token: string, name: string, id: string) => {
        try {
            if (!token) {
                throw new Error("Insira um token através do headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new Error("Token invalid")
            }
            
            const band = await this.bandDatabase.getBandByNameOrId(name,id)
            
            if(!band){
                throw new Error("Não foi possivel encontrar a banda");                
            }

            return band

        } catch (error: any) {
            throw new Error(error.message);
        }


    }
}        