import axios from 'axios';

import { ISpend } from '../../shared/model/spend.model';

const baseApiUrl = 'api/spends';

export default class SpendService {
  public find(id: number): Promise<ISpend> {
    return new Promise<ISpend>(resolve => {
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

  public create(entity: ISpend): Promise<ISpend> {
    return new Promise<ISpend>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ISpend): Promise<ISpend> {
    return new Promise<ISpend>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieveSpendAndBudgetDetails(company_id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/yearlySpendDetails/' + company_id).then(function(res) {
        resolve(res);
      });
    });
  }

  public retrieveApplicationData(company_id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/spends/getApplicationData/'+ company_id).then(function(res) {
        resolve(res);
      });
    });
  }

  public getSpendData(company_id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/spends/getSpendData/' + company_id).then(function(res) {
        resolve(res);
      });
    });
  }
}
