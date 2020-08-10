import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { ILabel } from '../../shared/model/label.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import LabelService from './label.service';

@Component
export default class Label extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('labelService') private labelService!: () => LabelService;
  private removeId: number = 0;
  public labels: ILabel[] = [];
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
    this.retrieveAllLabels();
  }

  public clear(): void {
    this.retrieveAllLabels();
  }

  public retrieveAllLabels(): void {
    console.log('inside retrieve function');
    this.isFetching = true;

    this.labelService()
      .retrieve()
      .then(
        res => {
          this.labels = res.data;
          console.log(this.labels);
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ILabel): void {
    this.removeId = instance.id!;
  }

  public removeLabel(): void {
    this.labelService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Label is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllLabels();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
