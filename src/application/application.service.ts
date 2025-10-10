import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './application.schema';
import { Model } from 'mongoose';
import { ApplicationInterface } from './application.interface';
import { CreateApplicantDto } from './dtos/create-application.dto';
import { UpdateApplicantDto } from './dtos/update-application.dto';
import { EmployeeInterface } from 'src/employee/interface/employee.interface';
import { ApplicantStatus } from './enums/applicant-status.enum';
import { EmpStatus } from 'src/employee/enums/emp-status.enum';
import { UpdateApplicantStatusDto } from './dtos/update-applicant-status.dto';

@Injectable()
export class ApplicationService implements ApplicationInterface {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,

    @Inject('EmployeeInterface')
    private readonly employeeInterface: EmployeeInterface,
  ) {}

  async createApplication(
    createApplicationDto: CreateApplicantDto,
  ): Promise<Application> {
    return this.applicationModel.create(createApplicationDto);
  }

  async findApplicationById(id: string): Promise<Application | null> {
    return this.applicationModel.findById(id).exec();
  }

  async findAllApplications(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async updateApplication(
    id: string,
    updateApplicationDto: UpdateApplicantDto,
  ): Promise<Application | null> {
    return this.applicationModel
      .findByIdAndUpdate(id, updateApplicationDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async deleteApplication(id: string): Promise<Application | null> {
    return this.applicationModel.findByIdAndDelete(id).exec();
  }

  async applicationStatusUpdate(
    id: string,
    status: UpdateApplicantStatusDto,
  ): Promise<Application | null> {
    // Update the application status
    const updatedApp = await this.applicationModel
      .findByIdAndUpdate(
        id,
        { status: status.status },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    // ✅ When application is ACCEPTED, create a new Employee
    if (updatedApp && status.status === ApplicantStatus.ACCEPTED) {
      await this.employeeInterface.createEmployee({
        name: updatedApp.name,
        phoneNumber: updatedApp.phoneNumber,
        address: updatedApp.address,
        position: updatedApp.position,
        status: EmpStatus.INACTIVE,
        joinedDate: new Date(),
      });
    }

    return updatedApp;
  }
}
