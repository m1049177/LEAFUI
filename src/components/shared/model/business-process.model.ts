import { ICapabilities } from './capabilities.model';

export const enum ProcessStatus {
  Completed = 'Completed',
  InProgress = 'InProgress',
  Started = 'Started'
}

export interface IBusinessProcess {
  id?: number;
  name?: string;
  startDate?: Date;
  expectedEndDate?: Date;
  endDate?: Date;
  status?: ProcessStatus;
  capabilities?: ICapabilities;
}

export class BusinessProcess implements IBusinessProcess {
  constructor(
    public id?: number,
    public name?: string,
    public startDate?: Date,
    public expectedEndDate?: Date,
    public endDate?: Date,
    public status?: ProcessStatus,
    public capabilities?: ICapabilities
  ) {}
}
