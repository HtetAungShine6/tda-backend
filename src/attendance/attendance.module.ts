import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './attendance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    {
      provide: 'AttendanceInterface',
      useExisting: AttendanceService,
    },
  ],
  exports: [AttendanceService, 'AttendanceInterface'],
})
export class AttendanceModule {}
