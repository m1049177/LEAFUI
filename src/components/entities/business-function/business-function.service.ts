import axios from 'axios';

import { IBusinessFunction } from '../../shared/model/business-function.model';

const baseApiUrl = 'api/business-functions';

export default class BusinessFunctionService {
  public find(id: number): Promise<IBusinessFunction> {
    return new Promise<IBusinessFunction>(resolve => {
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

  public create(entity: IBusinessFunction): Promise<IBusinessFunction> {
    return new Promise<IBusinessFunction>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IBusinessFunction): Promise<IBusinessFunction> {
    return new Promise<IBusinessFunction>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
