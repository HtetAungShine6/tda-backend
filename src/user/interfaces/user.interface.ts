import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../user.schema";

export interface UserInterface {
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}