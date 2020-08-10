import { IBusinessProcess } from './business-process.model';

export const enum ResourcesRequired {
  People = 'People',
  ITSystems = 'ITSystems',
  Finance = 'Finance'
}

export interface IActivity {
  id?: number;
  name?: string;
  description?: string;
  resourcesRequired?: ResourcesRequired;
  businessProcess?: IBusinessProcess;
}

export class Activity implements IActivity {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public resourcesRequired?: ResourcesRequired,
    public businessProcess?: IBusinessProcess
  ) {}
}
