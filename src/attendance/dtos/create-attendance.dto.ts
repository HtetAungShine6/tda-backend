import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmpStatus } from 'src/employee/enums/emp-status.enum';

export class CreateAttendanceDto {
  @ApiProperty({
    description: 'Employee ID who is checking in',
    example: '652f3c1f29d9f20f8c9a1b23',
  })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({
    description: 'Check-in time of the employee',
    example: '2025-10-09T08:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  checkInTime?: Date;

  @ApiProperty({
    description: 'Check-out time of the employee',
    example: '2025-10-09T17:30:00Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  checkOutTime?: Date;

  @ApiProperty({
    description: 'Attendance status of the employee',
    enum: EmpStatus,
    example: EmpStatus.ACTIVE,
  })
  @IsEnum(EmpStatus)
  @IsNotEmpty()
  attendanceStatus: EmpStatus;
}
