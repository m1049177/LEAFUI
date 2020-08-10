import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { IExcelTemplate } from '../../shared/model/excel-template.model';
import ExcelTemplateService from './excel-template.service';

@Component
export default class ExcelTemplateDetails extends mixins(JhiDataUtils) {
  @Inject('excelTemplateService') private excelTemplateService!: () => ExcelTemplateService;
  public excelTemplate: IExcelTemplate = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.excelTemplateId) {
        vm.retrieveExcelTemplate(to.params.excelTemplateId);
      }
    });
  }

  public retrieveExcelTemplate(excelTemplateId: number) {
    this.excelTemplateService()
      .find(excelTemplateId)
      .then(res => {
        this.excelTemplate = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
