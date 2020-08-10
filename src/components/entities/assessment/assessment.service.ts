import axios from 'axios';

import { IAssessment } from '../../shared/model/assessment.model';

const baseApiUrl = 'api/assessments';

export default class AssessmentService {
  public find(id: number): Promise<IAssessment> {
    return new Promise<IAssessment>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IAssessment): Promise<IAssessment> {
    return new Promise<IAssessment>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IAssessment): Promise<IAssessment> {
    return new Promise<IAssessment>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
