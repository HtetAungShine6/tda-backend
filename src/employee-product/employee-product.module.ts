import { forwardRef, Module } from '@nestjs/common';
import { EmployeeProductController } from './employee-product.controller';
import { EmployeeProductServiceImpl } from './employee-product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeProduct, EmployeeProductSchema } from './employee-product.schema';
import { EmployeeModule } from 'src/employee/employee.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmployeeProduct.name,
        schema: EmployeeProductSchema, 
      },
    ]),
    forwardRef(() => EmployeeModule),
    forwardRef(() => ProductModule), 
  ],
  controllers: [EmployeeProductController],
  providers: [
    EmployeeProductServiceImpl,
    {
      provide: 'EmployeeProductInterface',
      useExisting: EmployeeProductServiceImpl,
    }
  ]
})
export class EmployeeProductModule {}
