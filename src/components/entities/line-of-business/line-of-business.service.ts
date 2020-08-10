import axios from 'axios';

import { ILineOfBusiness } from '../../shared/model/line-of-business.model';

const baseApiUrl = 'api/line-of-businesses';

export default class LineOfBusinessService {
  public find(id: number): Promise<ILineOfBusiness> {
    return new Promise<ILineOfBusiness>(resolve => {
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

  public create(entity: ILineOfBusiness): Promise<ILineOfBusiness> {
    return new Promise<ILineOfBusiness>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ILineOfBusiness): Promise<ILineOfBusiness> {
    return new Promise<ILineOfBusiness>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
  public searchData(lob_id: number): Promise<any> {
    return new Promise<any>(resolve => {
      const apiUrl = 'api/_search/lob';
      axios.get(`${apiUrl}/${lob_id}`).then(function(res) {
        resolve(res);
      });
    });
  }
}
