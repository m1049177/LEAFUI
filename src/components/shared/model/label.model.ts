import { ICompany } from './company.model';

export interface ILabel {
  id?: number;
  label_type?: string;
  label_data?: any;
  company?: ICompany;
}

export class Label implements ILabel {
  constructor(public id?: number, public label_type?: string, public label_data?: any, public company?: ICompany) {}
}
