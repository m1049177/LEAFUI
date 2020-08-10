import { ICompany } from './company.model';

export const enum TemplateType {
  APPPORTFOLIO = 'APPPORTFOLIO',
  TECHNICALVIEW = 'TECHNICALVIEW',
  BIZVIEW = 'BIZVIEW'
}

export interface IExcelTemplate {
  id?: number;
  fileNameContentType?: string;
  fileName?: any;
  type?: TemplateType;
  company?: ICompany;
}

export class ExcelTemplate implements IExcelTemplate {
  constructor(
    public id?: number,
    public fileNameContentType?: string,
    public fileName?: any,
    public type?: TemplateType,
    public company?: ICompany
  ) {}
}
