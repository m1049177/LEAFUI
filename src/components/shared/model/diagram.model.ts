import { ICompany } from './company.model';

export const enum DiagramCategory {
  APPPORTFOLIO = 'APPPORTFOLIO',
  TECHNICALVIEW = 'TECHNICALVIEW',
  FUNCTIONALVIEW = 'FUNCTIONALVIEW'
}

export interface IDiagram {
  id?: number;
  category?: DiagramCategory;
  pictureContentType?: string;
  picture?: any;
  company?: ICompany;
}

export class Diagram implements IDiagram {
  constructor(
    public id?: number,
    public category?: DiagramCategory,
    public pictureContentType?: string,
    public picture?: any,
    public company?: ICompany
  ) {}
}
