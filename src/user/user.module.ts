import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserServiceImpl } from './user.service';
import { CreateUserProvider } from './providers/create-user.provider';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        forwardRef(() => AuthModule),
    ],
    providers: [
        {
            provide: 'UserInterface',    
            useExisting: UserServiceImpl,        
        },
        UserServiceImpl,
        CreateUserProvider
    ],
    controllers: [UserController],
    exports: [
        UserServiceImpl,
        'UserInterface'
    ],
})
export class UserModule {}
