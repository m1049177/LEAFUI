import { ILineOfBusiness } from './line-of-business.model';

export const enum CurrencySuccessor {
  NOSUCCESSOR = 'NOSUCCESSOR',
  K = 'K',
  M = 'M'
  // B = 'B',
  // T = 'T'
}

export interface IRevenue {
  id?: number;
  date?: Date;
  amount?: number;
  successor?: CurrencySuccessor;
  lineOfBusiness?: ILineOfBusiness;
}

export class Revenue implements IRevenue {
  constructor(
    public id?: number,
    public date?: Date,
    public amount?: number,
    public successor?: CurrencySuccessor,
    public lineOfBusiness?: ILineOfBusiness
  ) {}
}
