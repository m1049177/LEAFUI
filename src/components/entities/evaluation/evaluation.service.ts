import axios from 'axios';

import { IEvaluation } from '../../shared/model/evaluation.model';

const baseApiUrl = 'api/evaluations';

export default class EvaluationService {
  public find(id: number): Promise<IEvaluation> {
    return new Promise<IEvaluation>(resolve => {
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

  public create(entity: IEvaluation): Promise<IEvaluation> {
    return new Promise<IEvaluation>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IEvaluation): Promise<IEvaluation> {
    return new Promise<IEvaluation>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
