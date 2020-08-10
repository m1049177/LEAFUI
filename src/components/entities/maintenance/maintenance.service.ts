import axios from 'axios';

import { IMaintenance } from '../../shared/model/maintenance.model';

const baseApiUrl = 'api/maintenances';

export default class MaintenanceService {
  public find(id: number): Promise<IMaintenance> {
    return new Promise<IMaintenance>(resolve => {
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

  public create(entity: IMaintenance): Promise<IMaintenance> {
    return new Promise<IMaintenance>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IMaintenance): Promise<IMaintenance> {
    return new Promise<IMaintenance>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
