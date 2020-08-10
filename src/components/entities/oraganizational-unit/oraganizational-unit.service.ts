import axios from 'axios';

import { IOraganizationalUnit } from '../../shared/model/oraganizational-unit.model';

const baseApiUrl = 'api/oraganizational-units';

export default class OraganizationalUnitService {
  public find(id: number): Promise<IOraganizationalUnit> {
    return new Promise<IOraganizationalUnit>(resolve => {
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

  public create(entity: IOraganizationalUnit): Promise<IOraganizationalUnit> {
    return new Promise<IOraganizationalUnit>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IOraganizationalUnit): Promise<IOraganizationalUnit> {
    return new Promise<IOraganizationalUnit>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
