import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Expense extends Document {
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
    type: String,
    required: false,
  })
  category?: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
