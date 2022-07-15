import { Band } from "../../src/model/Band"
import { bandMock, bandMock2 } from "./BandMock"

export class BandDatabaseMock {
    public async createBand(band: Band): Promise<void> {

    }

    
    public async getBandByNameOrId(name: string): Promise<Band | undefined> {
        switch(name) {
            case "Labe Banda":
                return bandMock
            case "Labanda":
                return bandMock2
            default: 
                return undefined
        }
    }

   
}