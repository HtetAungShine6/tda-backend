import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class EmployeeProduct extends Document {

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Employee' 
    })
    employeeId: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'Product' 
    })
    productId: string;

    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    quantity: number;

    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    totalPrice: number;

    @Prop({
        type: Date,
        default: Date.now
    })
    updatedAt: Date;
}

export const EmployeeProductSchema = SchemaFactory.createForClass(EmployeeProduct);