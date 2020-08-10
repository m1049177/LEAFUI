import axios from 'axios';

import { IIntegration } from '../../shared/model/integration.model';
import { IIntegrationData } from '@/components/shared/model/integrationData.model';

const baseApiUrl = 'api/integrations';

export default class IntegrationService {
  public find(id: number): Promise<IIntegration> {
    return new Promise<IIntegration>(resolve => {
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

  public create(entity: IIntegration): Promise<IIntegration> {
    return new Promise<IIntegration>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IIntegration): Promise<IIntegration> {
    return new Promise<IIntegration>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public getIntegrationData(appId: number): Promise<IIntegrationData> {
    return new Promise<IIntegrationData>(resolve => {
      const apiUrl = 'getIntegrationData'
      axios.get(`${baseApiUrl}/${apiUrl}/${appId}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

}
