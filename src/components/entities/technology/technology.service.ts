import axios from 'axios';

import { ITechnology } from '../../shared/model/technology.model';
import { ITechnologyAppCount } from '../../shared/model/technologyAppCount.model';

const baseApiUrl = 'api/technologies';

export default class TechnologyService {
  public find(id: number): Promise<ITechnology> {
    return new Promise<ITechnology>(resolve => {
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

  public create(entity: ITechnology): Promise<ITechnology> {
    return new Promise<ITechnology>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ITechnology): Promise<ITechnology> {
    return new Promise<ITechnology>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public technologyCount(company_id: number): Promise<ITechnologyAppCount[]> {
    return new Promise<ITechnologyAppCount[]>(resolve => {
      const apiUrl = 'api/technologies/AppCount';
      axios.get(`${apiUrl}/${company_id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }
  public totalCount(company_id: number): Promise<number[]> {
    return new Promise<number[]>(resolve => {
      const apiUrl = 'api/technologies/TechnologyCount';
      axios.get(`${apiUrl}/${company_id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public search(searchQuery: string): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/_search/technologies?query=' + searchQuery).then(function(res) {
        resolve(res);
      });
    });
  }
}
