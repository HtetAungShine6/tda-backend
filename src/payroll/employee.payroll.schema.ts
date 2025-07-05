import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Payroll extends Document{
    @Prop({
        type: Types.ObjectId,
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
    totalSalary: number;

    @Prop({
        type: Date,
        default: Date.now,
    })
    period: Date;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll); 