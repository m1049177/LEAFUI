import axios from 'axios';

import { IApplication } from '../../shared/model/application.model';
import { IChartData } from '../../shared/model/chartData.model';

const baseApiUrl = 'api/applications';

export default class ApplicationService {
  public find(id: number): Promise<IApplication> {
    return new Promise<IApplication>(resolve => {
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

  public create(entity: IApplication): Promise<IApplication> {
    return new Promise<IApplication>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IApplication): Promise<IApplication> {
    return new Promise<IApplication>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public search(query: string): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/_search/applications?query=' + query).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public organizationalChartData(): Promise<IChartData[]> {
    return new Promise<IChartData[]>(resolve => {
      const apiUrl = '/api/getAppChartData';
      axios.get(`${apiUrl}`).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
