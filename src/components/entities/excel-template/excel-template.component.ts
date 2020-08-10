import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IExcelTemplate } from '../../shared/model/excel-template.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import ExcelTemplateService from './excel-template.service';

@Component
export default class ExcelTemplate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('excelTemplateService') private excelTemplateService!: () => ExcelTemplateService;
  private removeId: number = 0;
  public excelTemplates: IExcelTemplate[] = [];
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
    this.retrieveAllExcelTemplates();
  }

  public clear(): void {
    this.retrieveAllExcelTemplates();
  }

  public retrieveAllExcelTemplates(): void {
    this.isFetching = true;

    this.excelTemplateService()
      .retrieve()
      .then(
        res => {
          this.excelTemplates = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IExcelTemplate): void {
    this.removeId = instance.id!;
  }

  public removeExcelTemplate(): void {
    this.excelTemplateService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A ExcelTemplate is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllExcelTemplates();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
