import { ILineOfBusiness } from './line-of-business.model';

export const enum ApplicationType {
  WebApplication = 'WebApplication',
  WindowsApplication = 'WindowsApplication',
  ReportingApplication = 'ReportingApplication',
  NativeMobileApp = 'NativeMobileApp',
  ConsoleApplication = 'ConsoleApplication',
  ERP = 'ERP',
  IntegrationTool = 'IntegrationTool'
}

export const enum ApplicationStatus {
  Running = 'Running',
  InProgress = 'InProgress',
  Halted = 'Halted',
  StartingPhase = 'StartingPhase'
}

export interface IApplication {
  id?: number;
  name?: string;
  description?: string;
  type?: ApplicationType;
  status?: ApplicationStatus;
  implementationDate?: Date;
  lineOfBusiness?: ILineOfBusiness;
}

export class Application implements IApplication {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: ApplicationType,
    public status?: ApplicationStatus,
    public implementationDate?: Date,
    public lineOfBusiness?: ILineOfBusiness
  ) {}
}
