import { forwardRef, Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeServiceImpl } from './income.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from './income.schema';
import { FinanceModule } from 'src/finance/finance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Income.name,
        schema: IncomeSchema,
      },
    ]),
    forwardRef(() => FinanceModule)
  ],
  controllers: [IncomeController],
  providers: [
    IncomeServiceImpl,
    {
      provide: 'IncomeInterface',
      useExisting: IncomeServiceImpl,
    }
  ]
})
export class IncomeModule {}
