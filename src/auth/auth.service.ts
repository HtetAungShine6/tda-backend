import { forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { SignInProvider } from './providers/signin.provider';
import { AuthInterface } from './interfaces/auth.interface';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService implements AuthInterface {
    constructor(
        private readonly signInProvider: SignInProvider,
    ){}

    async signIn(signInDto: SignInDto): Promise<User | null> {
        try {
            return await this.signInProvider.signIn(signInDto);
        } catch (error) {
            throw new RequestTimeoutException('Sign in failed');
        }
    }
}
