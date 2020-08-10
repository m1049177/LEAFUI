import { IApplication } from './application.model';

export const enum ExpenditureType {
  INFRA = 'INFRA',
  LICENSE = 'LICENSE',
  DEVELOPMENT = 'DEVELOPMENT',
  SUPPORTCOST = 'SUPPORTCOST',
  MISCELLANEOUS = 'MISCELLANEOUS'
}

export interface IExpenditure {
  id?: number;
  expenditureType?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  application?: IApplication;
}

export class Expenditure implements IExpenditure {
  constructor(
    public id?: number,
    public expenditureType?: string,
    public description?: string,
    public startDate?: Date,
    public endDate?: Date,
    public application?: IApplication
  ) {}
}
