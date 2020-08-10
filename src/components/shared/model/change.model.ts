import { IApplication } from './application.model';

export interface IChange {
  id?: number;
  description?: string;
  dateOfChange?: Date;
  application?: IApplication;
}

export class Change implements IChange {
  constructor(public id?: number, public description?: string, public dateOfChange?: Date, public application?: IApplication) {}
}
