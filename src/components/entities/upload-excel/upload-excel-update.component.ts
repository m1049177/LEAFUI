import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CompanyService from '../company/company.service';
import { ICompany } from '../../shared/model/company.model';

import AlertService from '../../shared/alert/alert.service';
import { IUploadExcel, UploadExcel } from '../../shared/model/upload-excel.model';
import UploadExcelService from './upload-excel.service';

const validations: any = {
  uploadExcel: {
    name: {
      required
    },
    type: {
      required
    },
    company: {
      required
    }
  }
};

@Component({
  validations
})
export default class UploadExcelUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('uploadExcelService') private uploadExcelService!: () => UploadExcelService;
  public uploadExcel: IUploadExcel = new UploadExcel();

  @Inject('companyService') private companyService!: () => CompanyService;

  public companies: ICompany[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.uploadExcelId) {
        vm.retrieveUploadExcel(to.params.uploadExcelId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.uploadExcel.id) {
      this.uploadExcelService()
        .update(this.uploadExcel)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A UploadExcel is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.uploadExcelService()
        .create(this.uploadExcel)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A UploadExcel is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveUploadExcel(uploadExcelId: number): void {
    this.uploadExcelService()
      .find(uploadExcelId)
      .then(res => {
        this.uploadExcel = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      }).catch(err => { console.error(err) });
  }
}
