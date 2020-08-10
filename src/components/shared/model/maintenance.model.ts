import { IApplication } from './application.model';

export interface IMaintenance {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  application?: IApplication;
}

export class Maintenance implements IMaintenance {
  constructor(public id?: number, public startDate?: Date, public endDate?: Date, public application?: IApplication) {}
}
