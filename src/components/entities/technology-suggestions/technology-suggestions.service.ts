import axios from 'axios';

import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';

const baseApiUrl = 'api/technology-suggestions';

export default class TechnologySuggestionsService {
  public find(id: number): Promise<ITechnologySuggestions> {
    return new Promise<ITechnologySuggestions>(resolve => {
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

  public create(entity: ITechnologySuggestions): Promise<ITechnologySuggestions> {
    return new Promise<ITechnologySuggestions>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ITechnologySuggestions): Promise<ITechnologySuggestions> {
    return new Promise<ITechnologySuggestions>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
  public search(searchQuery: string): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get('api/_search/technology-suggestions?query=' + searchQuery).then(function(res) {
        resolve(res);
      });
    });
  }
}
