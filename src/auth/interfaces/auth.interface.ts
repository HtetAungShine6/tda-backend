import { User } from "src/user/user.schema";
import { SignInDto } from "../dtos/signin.dto";

export interface AuthInterface {
    signIn(signInDto: SignInDto): Promise<User | null>;
}
