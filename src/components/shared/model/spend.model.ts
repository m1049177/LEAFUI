export const enum ExpenditureType {
  INFRA = 'INFRA',
  LICENSE = 'LICENSE',
  DEVELOPMENT = 'DEVELOPMENT',
  ENHANCEMENT = 'ENHANCEMENT',
  SUPPORTCOST = 'SUPPORTCOST',
  MISCELLANEOUS = 'MISCELLANEOUS'
}

export const enum ExpenditureSubType {
  ONCLOUD = 'ONCLOUD',
  ONPREMISSES = 'ONPREMISSES',
  ANNUAL = 'ANNUAL',
  ONETIME = 'ONETIME'
}

export const enum CurrencySuccessor {
  NOSUCCESSOR = 'NOSUCCESSOR',
  K = 'K',
  M = 'M'
  // B = 'B',
  // T = 'T'
}

export interface ISpend {
  id?: number;
  dateOfUpdate?: Date;
  amount?: number;
  spendId?: number;
  expenditureType?: string;
  expenditureSubType?: string;
  successor?: CurrencySuccessor;
}

export class Spend implements ISpend {
  constructor(
    public id?: number,
    public dateOfUpdate?: Date,
    public amount?: number,
    public spendId?: number,
    public expenditureType?: string,
    public expenditureSubType?: string,
    public successor?: CurrencySuccessor
  ) {}
}
