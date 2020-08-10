import axios from 'axios';

import buildPaginationQueryOpts from '../../shared/sort/sorts';

import { IBudget } from '../../shared/model/budget.model';

const baseApiUrl = 'api/budgets';

export default class BudgetService {
  public find(id: number): Promise<IBudget> {
    return new Promise<IBudget>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
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

  public create(entity: IBudget): Promise<IBudget> {
    return new Promise<IBudget>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IBudget): Promise<IBudget> {
    return new Promise<IBudget>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
