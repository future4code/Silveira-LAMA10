import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";


export default class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGeneratator: IdGenerator
    ) { }

    public createUser = async (user:UserInputDTO) => {
        console.log(user)
        try {
            const { email, password, name, role } = user;
            if (!email || !password || !name || !role) {
                throw new Error(" Fill up all the fields 'name', 'email', 'password' and 'role' ");
            }
            if (email.indexOf("@") === -1) {
                throw new Error("Email invalid");
            }
            if (password.length < 6) {
                throw new Error("Password should have at least 6 characters");
            }

            const userFromDB = await this.userDatabase.getUserByEmail(email);
            if (userFromDB) {
                throw new Error("Email already exists!");
            }

            const id = this.idGeneratator.generate();

            const hashPassword = await this.hashManager.hash(password);

            const newUser = new User(id, name, email, hashPassword, User.stringToUserRole(role))

            await this.userDatabase.createUser(newUser);

            const accessToken = this.authenticator.generateToken({ id, role });

            return accessToken;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public login = async (user: LoginInputDTO) => {

        try {
            const { email, password } = user

            if (!email || !password) {
                throw new Error("Password or Email invalid!")

            }
            const userFromDB = await this.userDatabase.getUserByEmail(email);

            if (!userFromDB) {
                throw new Error("Email doesn't exist!");
            }

            const hashCompare = await this.hashManager.compare(password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }

            const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            return accessToken;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}