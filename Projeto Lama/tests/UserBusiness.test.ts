import { UserBusiness } from "../src/business/UserBusiness"
import { UserDatabaseMock } from "./mocks/userDatabaseMock"


const userBusinessMock = new UserBusiness()


describe("Testando o UserBusiness", () => {
    test("", async () => {

        // try {
        //     await userBusinessMock.createUser()
        // } catch (error: any) {
        //     expect(error.message).toBe(404)
        //     expect(error.message).toBe("User not found")
        // }finally {
        //     expect.assertions(0)
        // }  
          
    })
    test("", async () => {
        // try {
        //     const getUserById = jest.fn(
        //         (id: string) => userBusinessMock.(id)
        //     )

        //     const result = await getUserById("id_mock_admin")

        //     expect(getUserById).toHaveBeenCalledWith("id_mock_admin")
        //     expect(result).toEqual({
        //         id: "id_mock_admin",
        //         name: "astrodev",
        //         email: "astrodev@gmail.com",
        //         role: "ADMIN",
        //     })
        // } catch (error) {

        // } finally {
        //     expect.assertions(2)
        // }  
    })

})