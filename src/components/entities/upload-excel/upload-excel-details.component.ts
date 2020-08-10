import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { IUploadExcel } from '../../shared/model/upload-excel.model';
import UploadExcelService from './upload-excel.service';

@Component
export default class UploadExcelDetails extends mixins(JhiDataUtils) {
  @Inject('uploadExcelService') private uploadExcelService!: () => UploadExcelService;
  public uploadExcel: IUploadExcel = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.uploadExcelId) {
        vm.retrieveUploadExcel(to.params.uploadExcelId);
      }
    });
  }

  public retrieveUploadExcel(uploadExcelId: number) {
    this.uploadExcelService()
      .find(uploadExcelId)
      .then(res => {
        this.uploadExcel = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
