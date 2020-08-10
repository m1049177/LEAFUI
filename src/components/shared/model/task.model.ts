import { IActivity } from './activity.model';
import { IEmployee } from './employee.model';

export const enum CurrencySuccessor {
  NOSUCCESSOR = 'NOSUCCESSOR',
  K = 'K',
  M = 'M',
  B = 'B'
}

export interface ITask {
  id?: number;
  name?: string;
  estimatedCost?: number;
  successor?: CurrencySuccessor;
  activity?: IActivity;
  employee?: IEmployee;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public name?: string,
    public estimatedCost?: number,
    public successor?: CurrencySuccessor,
    public activity?: IActivity,
    public employee?: IEmployee
  ) {}
}
