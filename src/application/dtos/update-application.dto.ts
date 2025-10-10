import { PartialType } from "@nestjs/swagger";
import { CreateApplicantDto } from "./create-application.dto";

export class UpdateApplicantDto extends PartialType(CreateApplicantDto){}