import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGeneratator: IdGenerator
    ) { }


    async createUser(user: UserInputDTO) {

        const { name, email, password, role } = user;
        if (!name || !email || !password || !role) {
            throw new Error(" Fill up all the fields 'name', 'email', 'password' and 'role' ");
        }
        if (email.indexOf("@") === -1) {
            throw new Error("Email invalid");
        }
        if (password.length < 6) {
            throw new Error("Password should have at least 6 caracters");
        }

        const userFromDB = await this.userDatabase.getUserByEmail(email);
        if (userFromDB) {
            throw new Error("Email already exists!");
        }

        const id = this.idGeneratator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async login(user: LoginInputDTO) {

        const { email, password } = user

        if (!email || !password) {
            throw new Error("Password or Email invalid!")

        }

        const userDatabase = new UserDatabase
        const userFromDB =  await userDatabase.getUserByEmail(email);

        if (!userFromDB) {
            throw new Error("Email doesn't exist!");
        }

        const hashCompare = await this.hashManager.compare(password,userFromDB.getPassword());
        
        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole()});

        

        return accessToken;
    }
}