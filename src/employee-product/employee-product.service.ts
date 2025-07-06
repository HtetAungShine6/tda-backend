import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeProduct } from './employee-product.schema';
import { Model, Types } from 'mongoose';
import { CreateEmployeeProductDto } from './dtos/create-employee-product.dto';
import { UpdateEmployeeProductDto } from './dtos/update-employee-product.dto';
import { EmployeeProductInterface } from './interface/employee-product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeInterface } from 'src/employee/interface/employee.interface';
import { ProductInterface } from 'src/product/interface/product.interface';
import { toObjectId } from 'src/common/utils/object-id.util';
import { PayrollInterface } from 'src/payroll/interface/payroll.interface';
import { Payroll } from 'src/payroll/employee.payroll.schema';
import { throwIfNotFound } from 'src/helpers/throwIfNotFound';
import { PayrollDocument } from 'src/payroll/payroll.document';
import { find } from 'rxjs';
@Injectable()
export class EmployeeProductServiceImpl implements EmployeeProductInterface {
  constructor(
    @InjectModel(EmployeeProduct.name)
    private readonly employeeProductModel: Model<EmployeeProduct>,

    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface,

    @Inject('ProductInterface')
    private readonly productInterface: ProductInterface,

    @Inject('PayrollInterface')
    private readonly payrollInterface: PayrollInterface,
  ) {}

  async createEmployeeProduct(
    createEmployeeProductDto: CreateEmployeeProductDto,
  ): Promise<EmployeeProduct> {
    const { employeeId, productId, quantity } = createEmployeeProductDto;
    await this.employeeInterface.findEmployeeById(employeeId);
    const product = await this.productInterface.findProductById(productId);
    const totalPrice = product.price * quantity;
    const now = new Date();
    const employeeProductToCreate = new this.employeeProductModel({
      ...createEmployeeProductDto,
      totalPrice,
      updatedAt: now,
    });

    const payrollByEmpId =
      await this.payrollInterface.findPayrollByEmployeeId(employeeId);
    if (!payrollByEmpId || payrollByEmpId.length === 0) {
      await this.payrollInterface.createPayroll({
        employeeId,
        totalQuantity: quantity,
        totalSalary: totalPrice,
      });
    } else {
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const existingPayroll =
        await this.payrollInterface.findPayrollByMonthYearAndEmployeeId(
          currentMonth,
          currentYear,
          employeeId,
        );
      if (!existingPayroll) {
        await this.payrollInterface.createPayroll({
          employeeId,
          totalQuantity: quantity,
          totalSalary: totalPrice,
        });
      } else {
        const updatedTotalQuantity = existingPayroll.totalQuantity + quantity;
        const updatedTotalSalary = existingPayroll.totalSalary + totalPrice;
        const payrollId = (existingPayroll._id as Types.ObjectId).toString();
        await this.payrollInterface.updatePayroll(payrollId, {
          totalQuantity: updatedTotalQuantity,
          totalSalary: updatedTotalSalary,
        });
      }
    }
    return employeeProductToCreate.save();
  }

  async findEmployeeProductById(id: string): Promise<EmployeeProduct> {
    const employeeProduct = await this.employeeProductModel.findById(id).exec();
    return throwIfNotFound(
      employeeProduct,
      id,
      'Employee Product',
    ) as EmployeeProduct;
  }

  async findEmployeeProductsByEmployeeId(
    empId: string,
  ): Promise<EmployeeProduct[]> {
    await this.employeeInterface.findEmployeeById(empId);
    const employeeProducts = await this.employeeProductModel
      .find({ employeeId: empId })
      .exec();
    return throwIfNotFound(
      employeeProducts,
      empId,
      'Employee Products',
    ) as EmployeeProduct[];
  }

  async findEmployeeProductsByProductId(
    productId: string,
  ): Promise<EmployeeProduct[]> {
    await this.productInterface.findProductById(productId);
    const employeeProducts = await this.employeeProductModel
      .find({ productId: productId })
      .exec();
    return throwIfNotFound(
      employeeProducts,
      productId,
      'Employee Products',
    ) as EmployeeProduct[];
  }

  async findAllEmployeeProducts(): Promise<EmployeeProduct[]> {
    return this.employeeProductModel.find().exec();
  }

  async updateEmployeeProduct(id: string, updateEmployeeProductDto: UpdateEmployeeProductDto): Promise<EmployeeProduct> {
    const existingEmployeeProduct = await this.findEmployeeProductById(id);

    // Step 1: Extract old values
    const oldQuantity = existingEmployeeProduct.quantity;
    const oldTotalPrice = existingEmployeeProduct.totalPrice;
    const oldUpdatedAt = existingEmployeeProduct.updatedAt;
    const oldMonth = oldUpdatedAt.getMonth() + 1;
    const oldYear = oldUpdatedAt.getFullYear();
    const employeeId = updateEmployeeProductDto.employeeId ?? existingEmployeeProduct.employeeId;

    // Step 2: Compute new values
    const productId = updateEmployeeProductDto.productId ?? existingEmployeeProduct.productId;
    const quantity = updateEmployeeProductDto.quantity ?? oldQuantity;
    const product = await this.productInterface.findProductById(productId);
    const totalPrice = product.price * quantity;

    // Step 3: Update EmployeeProduct
    const updatedEmployeeProduct = await this.employeeProductModel
      .findByIdAndUpdate(
        id,
        {
          ...updateEmployeeProductDto,
          totalPrice,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    const finalProduct = throwIfNotFound(updatedEmployeeProduct,id,'Employee Product') as EmployeeProduct;

    // Step 4: Adjust Payroll for the original month/year
    const payroll = await this.payrollInterface.findPayrollByMonthYearAndEmployeeId(
        oldMonth,
        oldYear,
        employeeId,
      );

    const newTotalQuantity = payroll.totalQuantity - oldQuantity + quantity;
    const newTotalSalary = payroll.totalSalary - oldTotalPrice + totalPrice;
    const payrollId = (payroll._id as Types.ObjectId).toString();

    await this.payrollInterface.updatePayroll(payrollId.toString(), {
      totalQuantity: newTotalQuantity,
      totalSalary: newTotalSalary,
    });

    return finalProduct;
  }

  async deleteEmployeeProduct(id: string): Promise<EmployeeProduct> {
    // Step 1: Retrieving the existing employee product
    const existingEmployeeProduct = await this.findEmployeeProductById(id);
    const oldQuantity = existingEmployeeProduct.quantity;
    const oldTotalPrice = existingEmployeeProduct.totalPrice;
    const oldMonth = existingEmployeeProduct.updatedAt.getMonth() + 1;
    const oldYear = existingEmployeeProduct.updatedAt.getFullYear();
    const employeeProductToDelete = await this.employeeProductModel.findByIdAndDelete(id).exec();

    const deletedProduct = throwIfNotFound(employeeProductToDelete, id, 'Employee Product') as EmployeeProduct;

    // Step 2: Updating the payroll for the original month/year
    const payroll = await this.payrollInterface.findPayrollByMonthYearAndEmployeeId(oldMonth, oldYear, deletedProduct.employeeId);
    const newTotalQuantity = payroll.totalQuantity - oldQuantity;
    const newTotalSalary = payroll.totalSalary - oldTotalPrice;
    const payrollId = (payroll._id as Types.ObjectId).toString();
    await this.payrollInterface.updatePayroll(payrollId, {
      totalQuantity: newTotalQuantity,
      totalSalary: newTotalSalary,
    });
    return deletedProduct;
  }
}
