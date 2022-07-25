import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band, BandInputDTO } from "../model/Band";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";


export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private authenticator: Authenticator,
        private idGeneratator: IdGenerator
    ) { }

    public registerBand = async (band: BandInputDTO, token: string) => {

        try {
            const idVazio: string = ""
            const { name, genre, responsible } = band;
            if (!name || !genre || !responsible) {
                throw new CustomError(422, " Fill up all the fields 'name', 'genre' and 'responsible'");
            }
            if (!token) {
                throw new CustomError(422, "Insert a token in the headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new CustomError(401, "Token invalid")
            }
            if (tokenData.role !== "ADMIN") {
                throw new CustomError(401, "Your credentials are not valid for this task");

            }
            const bandFromDB = await this.bandDatabase.getBandByNameOrId(name, idVazio);
            if (bandFromDB) {
                throw new CustomError(409, "Band already exists!");
            }

            const id = this.idGeneratator.generate();

            const newBand = new Band(id, name, genre, responsible)

            await this.bandDatabase.createBand(newBand);


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    public getBand = async (token: string, name: string, id: string) => {
        try {
            if (!token) {
                throw new CustomError(422, "Insert a token in the headers")
            }
            const tokenData = this.authenticator.getData(token)

            if (!tokenData) {
                throw new CustomError(409, "Token invalid")
            }

            const band = await this.bandDatabase.getBandByNameOrId(name, id)

            if (!band) {
                throw new CustomError(404, "Não foi possivel encontrar a banda");
            }

            return band

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }


    }
}
export default new BandBusiness(
    new BandDatabase(),
    new Authenticator(),
    new IdGenerator()
)        