import axios from 'axios';

import { IFunctionality } from '../../shared/model/functionality.model';

const baseApiUrl = 'api/functionalities';

export default class FunctionalityService {
  public find(id: number): Promise<IFunctionality> {
    return new Promise<IFunctionality>(resolve => {
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

  public create(entity: IFunctionality): Promise<IFunctionality> {
    return new Promise<IFunctionality>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IFunctionality): Promise<IFunctionality> {
    return new Promise<IFunctionality>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
