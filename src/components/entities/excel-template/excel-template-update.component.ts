import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CompanyService from '../company/company.service';
import { ICompany } from '../../shared/model/company.model';

import AlertService from '../../shared/alert/alert.service';
import { IExcelTemplate, ExcelTemplate } from '../../shared/model/excel-template.model';
import ExcelTemplateService from './excel-template.service';

const validations: any = {
  excelTemplate: {
    fileName: {
      required
    },
    type: {
      required
    }
  }
};

@Component({
  validations
})
export default class ExcelTemplateUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('excelTemplateService') private excelTemplateService!: () => ExcelTemplateService;
  public excelTemplate: IExcelTemplate = new ExcelTemplate();

  @Inject('companyService') private companyService!: () => CompanyService;

  public companies: ICompany[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.excelTemplateId) {
        vm.retrieveExcelTemplate(to.params.excelTemplateId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.excelTemplate.id) {
      this.excelTemplateService()
        .update(this.excelTemplate)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ExcelTemplate is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.excelTemplateService()
        .create(this.excelTemplate)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ExcelTemplate is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveExcelTemplate(excelTemplateId: number): void {
    this.excelTemplateService()
      .find(excelTemplateId)
      .then(res => {
        this.excelTemplate = res;
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
