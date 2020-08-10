import axios from 'axios';

import { IActivity } from '../../shared/model/activity.model';

const baseApiUrl = 'api/activities';

export default class ActivityService {
  public find(id: number): Promise<IActivity> {
    return new Promise<IActivity>(resolve => {
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

  public create(entity: IActivity): Promise<IActivity> {
    return new Promise<IActivity>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IActivity): Promise<IActivity> {
    return new Promise<IActivity>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public search(searchQuery: string): Promise<any> {
    return new Promise<any>(resolve => {
      const apiUrl = 'api/_search/activities?query=';
      axios.get(apiUrl + searchQuery).then(function(res) {
        resolve(res);
      });
    });
  }
}
