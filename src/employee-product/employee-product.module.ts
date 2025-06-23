import { Module } from '@nestjs/common';
import { EmployeeProductController } from './employee-product.controller';
import { EmployeeProductService } from './employee-product.service';

@Module({
  controllers: [EmployeeProductController],
  providers: [EmployeeProductService]
})
export class EmployeeProductModule {}
