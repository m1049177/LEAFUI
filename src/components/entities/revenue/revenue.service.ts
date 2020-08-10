import axios from 'axios';

import { IRevenue } from '../../shared/model/revenue.model';

const baseApiUrl = 'api/revenues';

export default class RevenueService {
  public find(id: number): Promise<IRevenue> {
    return new Promise<IRevenue>(resolve => {
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

  public create(entity: IRevenue): Promise<IRevenue> {
    return new Promise<IRevenue>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IRevenue): Promise<IRevenue> {
    return new Promise<IRevenue>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
