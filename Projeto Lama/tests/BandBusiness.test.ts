import { BandDatabase } from './../src/data/BandDatabase';
import { IdGeneratorMock } from './mocks/idGeneratorMock';
import BandBusiness from "../src/business/BandBusiness"
import { BandDatabaseMock } from './mocks/BandDatabaseMock';
import { BandInputDTO } from '../src/model/Band';
import { AuthenticatorMock } from './mocks/AuthenticatorMock';
import { bandMock, bandMock2 } from './mocks/BandMock';





const BandBusinessMock = new BandBusiness(
    new BandDatabaseMock() as BandDatabase,
    new AuthenticatorMock() as any,
    new IdGeneratorMock()
)

describe("Testando o regitro de bandas", () => {
    test("Sucesso", async () => {        

          const token = "token"
        try {
            await BandBusinessMock.registerBand(bandMock,token)
            expect(token).toEqual("token")
        } catch(error: any) {
            console.log(error)
        } finally {
            expect.assertions(2)
        }
    })

    test("Fracasso (falta um ou mais campos)", async () => {
        try {
            await BandBusinessMock.registerBand(bandMock2, "João das Coves")
        } catch(error: any) {
            expect(error.message).toEqual("Fill up all the fields 'name', 'genre' and 'responsible")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })
})