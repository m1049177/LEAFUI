import { IEmployee } from './employee.model';
import { ICompany } from './company.model';

export interface IOraganizationalUnit {
  id?: number;
  name?: string;
  employee?: IEmployee;
  company?: ICompany;
}

export class OraganizationalUnit implements IOraganizationalUnit {
  constructor(public id?: number, public name?: string, public employee?: IEmployee, public company?: ICompany) {}
}
