import { IApplication } from './application.model';

export const enum CurrencySuccessor {
  NOSUCCESSOR = 'NOSUCCESSOR',
  K = 'K',
  M = 'M'
  // B = 'B',
  // T = 'T'
}

export interface IBudget {
  id?: number;
  amount?: number;
  year?: number;
  successor?: CurrencySuccessor;
  application?: IApplication;
}

export class Budget implements IBudget {
  constructor(
    public id?: number,
    public amount?: number,
    public year?: number,
    public successor?: CurrencySuccessor,
    public application?: IApplication
  ) {}
}
