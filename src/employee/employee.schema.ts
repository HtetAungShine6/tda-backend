import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EmpStatus } from './enums/emp-status.enum';

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
    type: String,
    required: true,
    enum: Object.values(EmpStatus),
    default: EmpStatus.ACTIVE,
  })
  status: EmpStatus;

  @Prop({
    type: Date,
    required: true,
  })
  joinedDate: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
