import axios from 'axios';

import { IUploadExcel } from '../../shared/model/upload-excel.model';

const baseApiUrl = 'api/upload-excels';

export default class UploadExcelService {
  public find(id: number): Promise<IUploadExcel> {
    return new Promise<IUploadExcel>(resolve => {
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

  public create(entity: IUploadExcel): Promise<IUploadExcel> {
    return new Promise<IUploadExcel>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IUploadExcel): Promise<IUploadExcel> {
    return new Promise<IUploadExcel>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
