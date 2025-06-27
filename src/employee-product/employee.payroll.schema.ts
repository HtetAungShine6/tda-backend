import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class EmployeePayroll extends Document{
    @Prop({
        type: String,
        required: true,
    })
    employeeId: string;

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    totalQuantity: number;

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    totalPayroll: number;

    @Prop({
        type: Date,
        default: Date.now,
    })
    updatedAt: Date;

    @Prop({
        type: Date,
        required: true,
    })
    payrollDate: Date;
}

export const EmployeePayrollSchema = SchemaFactory.createForClass(EmployeePayroll); 