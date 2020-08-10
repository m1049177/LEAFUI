import axios from 'axios';

import { IBusinessProcess } from '../../shared/model/business-process.model';

const baseApiUrl = 'api/business-processes';

export default class BusinessProcessService {
  public find(id: number): Promise<IBusinessProcess> {
    return new Promise<IBusinessProcess>(resolve => {
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

  public create(entity: IBusinessProcess): Promise<IBusinessProcess> {
    return new Promise<IBusinessProcess>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IBusinessProcess): Promise<IBusinessProcess> {
    return new Promise<IBusinessProcess>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
