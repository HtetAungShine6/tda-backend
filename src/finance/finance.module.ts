import { forwardRef, Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceServiceImpl } from './finance.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Finance, FinanceSchema } from './finance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Finance.name,
        schema: FinanceSchema,
      }
    ])
  ],
  controllers: [FinanceController],
  providers: [
    FinanceServiceImpl,
    {
      provide: 'FinanceInterface',
      useExisting: FinanceServiceImpl,
    }
  ],
  exports: [FinanceServiceImpl, 'FinanceInterface'],
})
export class FinanceModule {}
