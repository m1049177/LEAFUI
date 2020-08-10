import axios from 'axios';

import { IDiagram } from '../../shared/model/diagram.model';

const baseApiUrl = 'api/diagrams';

export default class DiagramService {
  public find(id: number): Promise<IDiagram> {
    return new Promise<IDiagram>(resolve => {
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

  public create(entity: IDiagram): Promise<IDiagram> {
    return new Promise<IDiagram>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IDiagram): Promise<IDiagram> {
    return new Promise<IDiagram>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
