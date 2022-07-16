import { ShowBusiness } from "../src/business/ShowBusiness"
import { ShowDatabase } from "../src/data/ShowDatabase"
import { ShowInputDTO } from "../src/model/Show"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { ShowDatabaseMock } from "./mocks/ShowDatabaseMock"

const ShowBusinessMock = new ShowBusiness(
    new ShowDatabaseMock() as ShowDatabase,
    new AuthenticatorMock() as any,
    new IdGeneratorMock()
)

describe("Testando o regitro de show", () => {
    test("Sucesso", async () => {
        const token = "token"
        const show: ShowInputDTO = {
            weekDay: 'Friday',
            startTime: 8,
            endTime: 10,
            bandId: 'band_id'
        }
        try {
            await ShowBusinessMock.addShow(show, token)
            expect(token).toEqual("token")
        } catch (error: any) {
        } finally {
            expect.assertions(0)
        }
    })

    test("Fracasso não informou o responsável", async () => {
        const token = "token"
        const show: ShowInputDTO = {
            weekDay: 'DSDASD',
            startTime: 8,
            endTime: 10,
            bandId: 'band_id'
        }
        try {
            
            await ShowBusinessMock.addShow(show,token)
        } catch (error: any) {
            expect(error.message).toEqual("Enter a valid day, 'Friday', 'Saturday' or 'Sunday'")
            expect(error.statusCode).toBe(409)
        } finally {
            expect.assertions(2)
        }
    })
})