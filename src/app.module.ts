import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeProductModule } from './employee-product/employee-product.module';
import { PayrollModule } from './payroll/payroll.module';
import jwtConfig from './auth/config/jwt.config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { FinanceModule } from './finance/finance.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], 
    }),
    MongooseModule.forRootAsync({ 
      imports: [
        ConfigModule
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_NAME'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forFeature(jwtConfig), 
    JwtModule.registerAsync(jwtConfig.asProvider()),
    AuthModule,
    UserModule,
    EmployeeModule,
    ProductModule,
    EmployeeProductModule,
    PayrollModule,
    ExpenseModule,
    IncomeModule,
    FinanceModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
