import axios from 'axios';

import { IExpenditure } from '../../shared/model/expenditure.model';

const baseApiUrl = 'api/expenditures';

export default class ExpenditureService {
  public find(id: number): Promise<IExpenditure> {
    return new Promise<IExpenditure>(resolve => {
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

  public create(entity: IExpenditure): Promise<IExpenditure> {
    return new Promise<IExpenditure>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IExpenditure): Promise<IExpenditure> {
    return new Promise<IExpenditure>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
