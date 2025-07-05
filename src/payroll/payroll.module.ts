import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payroll, PayrollSchema } from './employee.payroll.schema';
import { PayrollController } from './payroll.controller';
import { PayrollServiceImpl } from './payroll.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payroll.name,
        schema: PayrollSchema,
      },
    ]),
    forwardRef(() => EmployeeModule), 
  ],
  controllers: [PayrollController],
  providers: [
    PayrollServiceImpl,
    {
      provide: 'PayrollInterface',
      useExisting: PayrollServiceImpl,
    },
  ],
  exports: [PayrollServiceImpl, 'PayrollInterface'],
})
export class PayrollModule {}
