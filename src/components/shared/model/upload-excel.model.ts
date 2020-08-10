import { ICompany } from './company.model';

export const enum UploadExcelType {
  APPPORTFOLIO = 'APPPORTFOLIO',
  TECHNICALVIEW = 'TECHNICALVIEW',
  BIZVIEW = 'BIZVIEW'
}

export interface IUploadExcel {
  id?: number;
  nameContentType?: string;
  name?: any;
  type?: UploadExcelType;
  company?: ICompany;
}

export class UploadExcel implements IUploadExcel {
  constructor(
    public id?: number,
    public nameContentType?: string,
    public name?: any,
    public type?: UploadExcelType,
    public company?: ICompany
  ) {}
}
