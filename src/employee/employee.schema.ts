import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    phoneNumber: string;

    @Prop({
        type: String,
        required: true,
    })
    address: string;

    @Prop({
        type: String,
        required: true,
    })
    position: string;

    @Prop({
        type: Date,
        required: true,
    })
    joinedDate: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);