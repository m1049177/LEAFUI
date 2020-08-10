import axios from 'axios';

import { IExcelTemplate } from '../../shared/model/excel-template.model';

const baseApiUrl = 'api/excel-templates';

export default class ExcelTemplateService {
  public find(id: number): Promise<IExcelTemplate> {
    return new Promise<IExcelTemplate>(resolve => {
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

  public create(entity: IExcelTemplate): Promise<IExcelTemplate> {
    return new Promise<IExcelTemplate>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IExcelTemplate): Promise<IExcelTemplate> {
    return new Promise<IExcelTemplate>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
