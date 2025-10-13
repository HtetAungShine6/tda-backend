import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EmpStatus } from 'src/employee/enums/emp-status.enum';

@Schema()
export class Attendance extends Document {
  @Prop({
    type: String,
    required: true,
  })
  employeeId: string;

  @Prop({
    type: Date,
    required: false,
  })
  checkInTime?: Date;

  @Prop({
    type: Date,
    required: false,
  })
  checkOutTime?: Date;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(EmpStatus),
    default: EmpStatus.ACTIVE,
  })
  attendanceStatus: EmpStatus;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
