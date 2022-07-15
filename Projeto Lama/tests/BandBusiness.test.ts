import { BandDatabase } from './../src/data/BandDatabase';
import { IdGeneratorMock } from './mocks/idGeneratorMock';
import BandBusiness from "../src/business/BandBusiness"

// let AuthenticatorMock =  {
//     generateToken: jest.fn((data:any)=> "token"),
// } as any

// const BandBusinessMock = new BandBusiness(
//     new BandDatabasebaseMock() as BandDatabase,
//     new AuthenticatorMock(),
//     new IdGeneratorMock()
// )

describe("Testando o regitro de bandas", () => {
    test("Sucesso", async () => {
        try {
            await BandBusiness.registerBand("Labebanda", "Psicodélico", "123456", "João das Coves")
            expect(token).toEqual("token")
        } catch(error: any) {
            console.log(error)
        } finally {
            expect.assertions(2)
        }
    })

    test("Fracasso (falta um ou mais campos)", async () => {
        try {
            await BandBusiness.registerBand("Labebanda", "", "João das Coves")
        } catch(error: any) {
            expect(error.message).toEqual("Fill up all the fields 'name', 'genre' and 'responsible")
            expect(error.statusCode).toBe(422)
        } finally {
            expect.assertions(2)
        }
    })
})