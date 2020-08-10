import axios from 'axios';

import { ICompany } from '../../shared/model/company.model';

const baseApiUrl = 'api/companies';

export default class CompanyService {
  public find(id: number): Promise<ICompany> {
    return new Promise<ICompany>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }
  public findby(id: number, picture: any,category: string): Promise<ICompany> {
    return new Promise<ICompany>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        let pictureData = {
          category : category,
          picture : picture.split(',')[1],
          pictureContentType : picture.split(',')[0],
          company : res.data,
        }
        axios.post('api/diagrams', pictureData).then(function(response) {
          console.log("uploaded successfully");
        });
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

  public create(entity: ICompany): Promise<ICompany> {
    return new Promise<ICompany>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ICompany): Promise<ICompany> {
    return new Promise<ICompany>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public getChartData(companyId: number): Promise<any[]> {
    return new Promise<any[]>(resolve => {
      const apiUrl = "api/getChartData";
      axios.get(`${apiUrl}/${companyId}`).then(res => {
        resolve(res.data);
      })
    })
  }
}
