import { IApplication } from './application.model';

export interface IReport {
  id?: number;
  name?: string;
  type?: string;
  reportingTool?: string;
  application?: IApplication;
}

export class Report implements IReport {
  constructor(
    public id?: number,
    public name?: string,
    public type?: string,
    public reportingTool?: string,
    public application?: IApplication
  ) {}
}
