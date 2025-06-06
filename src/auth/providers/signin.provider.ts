import { Inject, Injectable, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import { SignInDto } from "../dtos/signin.dto";
import { User } from "src/user/user.schema";
import { UserInterface } from "src/user/interfaces/user.interface";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class SignInProvider {
    constructor(
        @Inject('UserInterface')
        private readonly userService: UserInterface,

        private readonly hashingProvider: HashingProvider,

        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async signIn(signInDto: SignInDto): Promise<User | null> {
        const user = await this.userService.findUserByEmail(signInDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        let isEqualPassword: boolean = false;

        try {
            isEqualPassword = await this.hashingProvider.comparePassword(
                signInDto.password,
                user.password,
            );
        } catch (error) {
            throw new RequestTimeoutException('Password comparison failed');
        }

        if (!isEqualPassword) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user._id,
                email: user.email,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTtl,
            }
        )

        return {
            accessToken,
            ...user.toObject(),
        }
    }
}