import { forwardRef, Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.schema';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
    ]),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    {
      provide: 'ApplicationInterface',
      useExisting: ApplicationService,
    },
  ],
})
export class ApplicationModule {}
