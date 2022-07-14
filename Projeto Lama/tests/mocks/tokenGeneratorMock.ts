import { UserRole} from "../../src/model/User"


 interface AuthenticationData {
    id: string;
    role?: string;
  }


export class TokenGeneratorMock {
    public generate = (input: AuthenticationData): string => {
        return "token"
    }

    public verify(token: string) {
        return {
            id: "id_mock",
            role: UserRole.NORMAL
        }
    }
}