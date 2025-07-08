import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Finance extends Document {
    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    totalIncome: number;

    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    totalExpense: number;

     @Prop({
        type: Date,
        default: Date.now,
    })
    date: Date;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);