
import { Application } from "./application.schema";
import { CreateApplicantDto } from "./dtos/create-application.dto";
import { UpdateApplicantStatusDto } from "./dtos/update-applicant-status.dto";
import { UpdateApplicantDto } from "./dtos/update-application.dto";

export interface ApplicationInterface {
    createApplication(createApplicationDto: CreateApplicantDto): Promise<Application>;
    findApplicationById(id: string): Promise<Application | null>;
    findAllApplications(): Promise<Application[]>;
    updateApplication(id: string, updateApplicationDto: UpdateApplicantDto): Promise<Application | null>;
    deleteApplication(id: string): Promise<Application | null>;
    applicationStatusUpdate(id: string, status: UpdateApplicantStatusDto): Promise<Application | null>;
}