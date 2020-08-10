import { ILineOfBusiness } from './line-of-business.model';

export interface IBrand {
  id?: number;
  name?: string;
  lineOfBusiness?: ILineOfBusiness;
}

export class Brand implements IBrand {
  constructor(public id?: number, public name?: string, public lineOfBusiness?: ILineOfBusiness) {}
}
