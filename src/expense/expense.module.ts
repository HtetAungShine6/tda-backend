import { forwardRef, Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseServiceImpl } from './expense.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense.schema';
import { FinanceModule } from 'src/finance/finance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expense.name,
        schema: ExpenseSchema,
      },
    ]),
    forwardRef(() => FinanceModule)
  ],
  controllers: [ExpenseController],
  providers: [
    ExpenseServiceImpl,
    {
      provide: 'ExpenseInterface',
      useExisting: ExpenseServiceImpl,
    },
  ]
})
export class ExpenseModule {}
