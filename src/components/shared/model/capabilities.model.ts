import { IBusinessFunction } from './business-function.model';

export interface ICapabilities {
  id?: number;
  description?: string;
  businessFunction?: IBusinessFunction;
}

export class Capabilities implements ICapabilities {
  constructor(public id?: number, public description?: string, public businessFunction?: IBusinessFunction) {}
}
