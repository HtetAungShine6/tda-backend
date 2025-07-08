import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Income extends Document {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
    })
    description: string;

    @Prop({
        type: Number,
        required: true,
    })
    amount: number;
    
    @Prop({
        type: Date,
        required: true,
    })
    date: Date;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);