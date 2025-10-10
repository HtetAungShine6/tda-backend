import { Attendance } from "./attendance.schema";
import { CreateAttendanceDto } from "./dtos/create-attendance.dto";
import { UpdateAttendanceDto } from "./dtos/update-attendance.dto";

export interface AttendanceInterface {
    createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findAttendanceById(id: string): Promise<Attendance | null>;
    findAllAttendances(): Promise<Attendance[]>;
    updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance | null>;
    deleteAttendance(id: string): Promise<Attendance | null>;
}