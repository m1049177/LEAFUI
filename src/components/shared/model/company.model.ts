import { IUser } from './user.model';

export interface ICompany {
  id?: number;
  companyName?: string;
  description?: string;
  user?: IUser;
}

export class Company implements ICompany {
  constructor(public id?: number, public companyName?: string, public description?: string, public user?: IUser) {}
}
