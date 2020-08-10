import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IAssessment } from '../../shared/model/assessment.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import AssessmentService from './assessment.service';

@Component
export default class Assessment extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('assessmentService') private assessmentService!: () => AssessmentService;
  private removeId: number = 0;
  public assessments: IAssessment[] = [];

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
    this.retrieveAllAssessments();
  }

  public clear(): void {
    this.retrieveAllAssessments();
  }

  public retrieveAllAssessments(): void {
    this.isFetching = true;

    this.assessmentService()
      .retrieve()
      .then(
        res => {
          this.assessments = res.data;
          this.assessments = this.assessments.filter(element => (element.questions = JSON.parse(element.questions)));
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.error(err);
      this.isFetching = false;
     });
  }

  public prepareRemove(instance: IAssessment): void {
    this.removeId = instance.id!;
  }

  public removeAssessment(): void {
    this.assessmentService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Assessment is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllAssessments();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
