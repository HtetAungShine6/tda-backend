import { Module } from '@nestjs/common';
import { EmployeeServiceImpl } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema';
import { EmployeeRepo } from './repo/employee.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ])
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeServiceImpl,
    EmployeeRepo,
    {
      provide: 'EmployeeInterface',
      useExisting: EmployeeServiceImpl,
    }
  ],
  exports: [EmployeeServiceImpl, 'EmployeeInterface'],
})
export class EmployeeModule {}
