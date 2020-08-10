import { ILineOfBusiness } from './line-of-business.model';
import { IEmployee } from './employee.model';

export const enum BusinessFunctionType {
  Primary = 'Primary',
  Support = 'Support'
}

export interface IBusinessFunction {
  id?: number;
  type?: BusinessFunctionType;
  name?: string;
  lineOfBusiness?: ILineOfBusiness;
  employee?: IEmployee;
}

export class BusinessFunction implements IBusinessFunction {
  constructor(
    public id?: number,
    public type?: BusinessFunctionType,
    public name?: string,
    public lineOfBusiness?: ILineOfBusiness,
    public employee?: IEmployee
  ) {}
}
