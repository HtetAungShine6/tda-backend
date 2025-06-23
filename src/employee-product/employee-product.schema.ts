import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class EmployeeProduct extends Document {

    @Prop({
        type: String,
        required: true,
        ref: 'Employee' 
    })
    employeeId: string;

    @Prop({
        type: String,
        required: true,
        ref: 'Product' 
    })
    productId: string;

    @Prop({
        type: Number,
        required: true,
        default: 1
    })
    quantity: number;
}

export const EmployeeProductSchema = SchemaFactory.createForClass(EmployeeProduct);