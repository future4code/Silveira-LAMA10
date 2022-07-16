import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import { CustomError } from "../error/CustomError";


export  class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGeneratator: IdGenerator
    ) { }

    public createUser = async (user: UserInputDTO) => {
        
        try {
            const { email, password, name, role } = user;
            if (!email || !password || !name || !role) {
                throw new CustomError(422, " Fill up all the fields 'name', 'email', 'password' and 'role' ");
            }
            if (email.indexOf("@") === -1) {
                throw new CustomError(422, "Email invalid");
            }
            if (password.length < 6) {
                throw new CustomError(422, "Password should have at least 6 characters");
            }

            const userFromDB = await this.userDatabase.getUserByEmail(email);
            if (userFromDB) {
                throw new CustomError(409, "Email already exists!");
            }

            const id = this.idGeneratator.generate();

            const hashPassword = await this.hashManager.hash(password);

            const newUser = new User(id, name, email, hashPassword, User.stringToUserRole(role))

            await this.userDatabase.createUser(newUser);

            const accessToken = this.authenticator.generateToken({ id, role });

            return accessToken;

        } catch (error: any) {
            if (error.message.includes("key 'email'")) {
                throw new CustomError(409, "Email already in use")
            }
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public login = async (user: LoginInputDTO) => {

        try {
            const { email, password } = user

            if (!email || !password) {
                throw new CustomError(422, "Password or Email invalid!")

            }
            const userFromDB = await this.userDatabase.getUserByEmail(email);

            if (!userFromDB) {
                throw new CustomError(401, "Email doesn't exist!");
            }

            const hashCompare = await this.hashManager.compare(password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new CustomError(401, "Invalid Password!");
            }

            const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            return accessToken;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
         
        }
    }
}

export default new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new HashManager(),
    new IdGenerator()
 )