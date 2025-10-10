import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './attendance.schema';
import { Model } from 'mongoose';
import { AttendanceInterface } from './attendance.interface';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';

@Injectable()
export class AttendanceService implements AttendanceInterface {
    constructor(
        @InjectModel(Attendance.name)
        private readonly attendanceModel: Model<Attendance>
    ){}

    async createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        return this.attendanceModel.create(createAttendanceDto);
    }

    async findAttendanceById(id: string): Promise<Attendance | null> {
        return this.attendanceModel.findById(id).exec();
    }

    async findAllAttendances(): Promise<Attendance[]> {
        return this.attendanceModel.find().exec();
    }

    async updateAttendance(id: string, updateAttendanceDto: any): Promise<Attendance | null> {
        return this.attendanceModel.findByIdAndUpdate(id, updateAttendanceDto, {
            new: true,
            runValidators: true,
        }).exec();
    }

    async deleteAttendance(id: string): Promise<Attendance | null> {
        return this.attendanceModel.findByIdAndDelete(id).exec();
    }
}
