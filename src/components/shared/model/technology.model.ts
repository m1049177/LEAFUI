import { IApplication } from './application.model';
import { ITechnologyStack } from './technology-stack.model';

export interface ITechnology {
  id?: number;
  application?: IApplication;
  technologyStack?: ITechnologyStack;
}

export class Technology implements ITechnology {
  constructor(public id?: number, public application?: IApplication, public technologyStack?: ITechnologyStack) {}
}
