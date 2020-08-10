import { IApplication } from './application.model';

export interface IFunctionality {
  id?: number;
  name?: string;
  majorModules?: string;
  application?: IApplication;
}

export class Functionality implements IFunctionality {
  constructor(public id?: number, public name?: string, public majorModules?: string, public application?: IApplication) {}
}
