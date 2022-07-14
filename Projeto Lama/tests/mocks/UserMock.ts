import { User, UserRole } from "../../src/model/User";

export const userMock = new User(
    "id_user_1",
    "user1",
    "user1@gmail.com",
    "123456",
    UserRole.NORMAL
)

export const userAdminMock = new User(
    "id_mock_admin",
    "astrodev",
    "astrodev@gmail.com",
    "123456",
    UserRole.ADMIN
) 