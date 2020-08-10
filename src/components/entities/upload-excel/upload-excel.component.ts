import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IUploadExcel } from '../../shared/model/upload-excel.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import UploadExcelService from './upload-excel.service';

@Component
export default class UploadExcel extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('uploadExcelService') private uploadExcelService!: () => UploadExcelService;
  private removeId: number = 0;
  public uploadExcels: IUploadExcel[] = [];
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllUploadExcels();
  }

  public clear(): void {
    this.retrieveAllUploadExcels();
  }

  public retrieveAllUploadExcels(): void {
    this.isFetching = true;

    this.uploadExcelService()
      .retrieve()
      .then(
        res => {
          this.uploadExcels = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IUploadExcel): void {
    this.removeId = instance.id!;
  }

  public removeUploadExcel(): void {
    this.uploadExcelService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A UploadExcel is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllUploadExcels();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
