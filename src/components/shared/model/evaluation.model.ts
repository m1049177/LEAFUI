import { IApplication } from './application.model';
import { AssessmentCategory } from './assessment.model';

// export const enum AssessmentCategory {
//   ARCHITECTUREPRINCIPLE = 'ARCHITECTUREPRINCIPLE',
//   DEPLOYMENT = 'DEPLOYMENT',
//   INTERNATIONALIZATION = 'INTERNATIONALIZATION',
//   SECURITY = 'SECURITY',
//   AVAILABILITY = 'AVAILABILITY',
//   SCALABILITY = 'SCALABILITY',
//   RELIABILITY = 'RELIABILITY',
//   MAINTAINABILITY = 'MAINTAINABILITY',
//   DATAARCHITECTURE = 'DATAARCHITECTURE'
// }

export interface IEvaluation {
  id?: number;
  attemptDate?: Date;
  assessmentCategory?: AssessmentCategory;
  score?: number;
  assessmentResult?: any;
  application?: IApplication;
}
export class EvaluationResult {
  public question?: string[];
  public result?: string[];
  public category?: string;
  public description?: string[];
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public attemptDate?: Date,
    public assessmentCategory?: AssessmentCategory,
    public score?: number,
    public assessmentResult?: any,
    public application?: IApplication
  ) {}
}
