import axios from 'axios';

import { ITechnologyStack } from '../../shared/model/technology-stack.model';

const baseApiUrl = 'api/technology-stacks';

export default class TechnologyStackService {
  public find(id: number): Promise<ITechnologyStack> {
    return new Promise<ITechnologyStack>(resolve => {
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

  public create(entity: ITechnologyStack): Promise<ITechnologyStack> {
    return new Promise<ITechnologyStack>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ITechnologyStack): Promise<ITechnologyStack> {
    return new Promise<ITechnologyStack>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public search(searchQuery: string): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/_search/technology-stacks?query=' + searchQuery).then(function(res) {
        resolve(res);
      });
    });
  }
}
