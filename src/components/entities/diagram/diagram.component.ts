import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IDiagram } from '../../shared/model/diagram.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import DiagramService from './diagram.service';

@Component
export default class Diagram extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('diagramService') private diagramService!: () => DiagramService;
  private removeId: number = 0;
  public diagrams: IDiagram[] = [];
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
    this.retrieveAllDiagrams();
  }

  public clear(): void {
    this.retrieveAllDiagrams();
  }

  public retrieveAllDiagrams(): void {
    this.isFetching = true;

    this.diagramService()
      .retrieve()
      .then(
        res => {
          this.diagrams = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IDiagram): void {
    this.removeId = instance.id!;
  }

  public removeDiagram(): void {
    this.diagramService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Diagram is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllDiagrams();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
