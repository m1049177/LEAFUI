import axios from 'axios';

import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';

const baseApiUrl = 'api/technology-recommendations';

export default class TechnologyRecommendationService {
  public find(id: number): Promise<ITechnologyRecommendation> {
    return new Promise<ITechnologyRecommendation>(resolve => {
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

  public create(entity: ITechnologyRecommendation): Promise<ITechnologyRecommendation> {
    return new Promise<ITechnologyRecommendation>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ITechnologyRecommendation): Promise<ITechnologyRecommendation> {
    return new Promise<ITechnologyRecommendation>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public search(searchQuery: string): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/_search/technology-recommendations?query=' + searchQuery).then(function(res) {
        resolve(res);
      });
    });
  }
}
