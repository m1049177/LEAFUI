import { IApplication } from './application.model';

export const enum IssueStatus {
  Solved = 'Solved',
  Open = 'Open',
  InProgress = 'InProgress'
}

export const enum TypeOfIssue {
  Critical = 'Critical',
  Normal = 'Normal',
  Major = 'Major'
}

export interface IIssue {
  id?: number;
  description?: string;
  dateOfIssue?: Date;
  status?: IssueStatus;
  solvedDate?: Date;
  solvedBy?: string;
  numberOfDays?: number;
  typeOfIssue?: TypeOfIssue;
  application?: IApplication;
}

export class Issue implements IIssue {
  constructor(
    public id?: number,
    public description?: string,
    public dateOfIssue?: Date,
    public status?: IssueStatus,
    public solvedDate?: Date,
    public solvedBy?: string,
    public numberOfDays?: number,
    public typeOfIssue?: TypeOfIssue,
    public application?: IApplication
  ) {}
}
