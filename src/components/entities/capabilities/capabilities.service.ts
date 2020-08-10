import axios from 'axios';

import { ICapabilities } from '../../shared/model/capabilities.model';
import { IChartData } from '../../shared/model/chartData.model';

const baseApiUrl = 'api/capabilities';

export default class CapabilitiesService {
  public find(id: number): Promise<ICapabilities> {
    return new Promise<ICapabilities>(resolve => {
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
  public organizationalChartData(): Promise<IChartData[]> {
    return new Promise<IChartData[]>(resolve => {
      const apiUrl = '/api/getChartData';
      axios.get(`${apiUrl}`).then(function(res) {
        resolve(res.data);
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

  public create(entity: ICapabilities): Promise<ICapabilities> {
    return new Promise<ICapabilities>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ICapabilities): Promise<ICapabilities> {
    return new Promise<ICapabilities>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
