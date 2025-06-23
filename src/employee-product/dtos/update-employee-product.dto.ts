import { PartialType } from "@nestjs/swagger";
import { CreateEmployeeProductDto } from "./create-employee-product.dto";

export class UpdateEmployeeProductDto extends PartialType(CreateEmployeeProductDto){}