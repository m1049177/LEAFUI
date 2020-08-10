export const enum AssessmentCategory {
  ARCHITECTUREPRINCIPLE = 'ARCHITECTUREPRINCIPLE',
  DEPLOYMENT = 'DEPLOYMENT',
  INTERNATIONALIZATION = 'INTERNATIONALIZATION',
  SECURITY = 'SECURITY',
  AVAILABILITY = 'AVAILABILITY',
  SCALABILITY = 'SCALABILITY',
  RELIABILITY = 'RELIABILITY',
  MAINTAINABILITY = 'MAINTAINABILITY',
  DATAARCHITECTURE = 'DATAARCHITECTURE'
}

export interface IAssessment {
  id?: number;
  assessmentCategory?: AssessmentCategory;
  questions?: any;
}

export class Assessment implements IAssessment {
  constructor(public id?: number, public assessmentCategory?: AssessmentCategory, public questions?: any) {}
}
