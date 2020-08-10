import { IOraganizationalUnit } from './oraganizational-unit.model';
import { IEmployee } from './employee.model';

export interface ILineOfBusiness {
  id?: number;
  name?: string;
  oraganizationalUnit?: IOraganizationalUnit;
  employee?: IEmployee;
}

export class LineOfBusiness implements ILineOfBusiness {
  constructor(public id?: number, public name?: string, public oraganizationalUnit?: IOraganizationalUnit, public employee?: IEmployee) {}
}
