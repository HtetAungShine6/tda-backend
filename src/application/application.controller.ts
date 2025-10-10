import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApplicationInterface } from './application.interface';
import { create } from 'domain';
import { CreateApplicantDto } from './dtos/create-application.dto';
import { UpdateApplicantDto } from './dtos/update-application.dto';
import { UpdateEmployeeStatusDto } from 'src/employee/dtos/update-employee-status.dto';
import { UpdateApplicantStatusDto } from './dtos/update-applicant-status.dto';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(
    @Inject('ApplicationInterface')
    private readonly applicationInterface: ApplicationInterface,
  ) {}

  @Post()
  createApplication(@Body() createApplicationDto: CreateApplicantDto) {
    return this.applicationInterface.createApplication(createApplicationDto);
  }

  @Get()
  findAllApplications() {
    return this.applicationInterface.findAllApplications();
  }

  @Get('/:id')
  findApplicationById(@Param('id') id: string) {
    return this.applicationInterface.findApplicationById(id);
  }

  @Patch('/:id/status')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'MongoDB _id of the applicant',
  })
  @ApiBody({ type: UpdateApplicantStatusDto })
  applicationStatusUpdate(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicantStatusDto,
  ) {
    return this.applicationInterface.applicationStatusUpdate(
      id,
      updateApplicationDto,
    );
  }

  @Delete('/:id')
  deleteApplication(@Param('id') id: string) {
    return this.applicationInterface.deleteApplication(id);
  }

  @Patch('/:id')
  updateApplication(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicantDto,
  ) {
    return this.applicationInterface.updateApplication(
      id,
      updateApplicationDto,
    );
  }
}
