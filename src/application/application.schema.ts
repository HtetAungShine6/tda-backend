import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApplicantStatus } from './enums/applicant-status.enum';

@Schema()
export class Application extends Document {
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
  information: string;

  @Prop({
    type: String,
    required: true,
  })
  position: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(ApplicantStatus),
    default: ApplicantStatus.APPLIED,
  })
  status: ApplicantStatus;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
