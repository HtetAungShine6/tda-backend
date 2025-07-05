import { Document, Types } from 'mongoose';
import { Payroll } from './employee.payroll.schema';

export type PayrollDocument = Payroll & Document;