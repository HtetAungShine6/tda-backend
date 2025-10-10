import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttendanceInterface } from './attendance.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { UpdateAttendanceDto } from './dtos/update-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
    constructor(
        @Inject('AttendanceInterface')
        private readonly attendanceInterface: AttendanceInterface,
    ){}

    @Post()
    @Auth(AuthType.Bearer)
    @ApiBearerAuth('bearer-token')
    @ApiOperation({ summary: 'Create a new attendance record' })
    createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendanceInterface.createAttendance(createAttendanceDto);
    }

    @Get('/:id')
    findAttendanceById(@Param('id') id: string) {
        return this.attendanceInterface.findAttendanceById(id);
    }

    @Get()
    findAllAttendances() {
        return this.attendanceInterface.findAllAttendances();
    }

    @Patch('/:id')
    updateAttendance(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
        return this.attendanceInterface.updateAttendance(id, updateAttendanceDto);
    }

    @Delete('/:id')
    deleteAttendance(@Param('id') id: string) {
        return this.attendanceInterface.deleteAttendance(id);
    }
}
