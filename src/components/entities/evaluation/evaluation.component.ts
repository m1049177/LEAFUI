import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IEvaluation } from '../../shared/model/evaluation.model';
import AlertService from '../../shared/alert/alert.service';

import JhiDataUtils from '../../shared/data/data-utils.service';

import EvaluationService from './evaluation.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

@Component
export default class Evaluation extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('evaluationService') private evaluationService!: () => EvaluationService;
  @Inject('filterService') private filterService!: () => FilterService;
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public company_id: number = 0;
  private removeId: number = 0;
  public evaluations: IEvaluation[] = [];

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
  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllEvaluations();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllEvaluations();
    }
  }

  public mounted(): void {
    // this.retrieveAllEvaluations();
  }

  public clear(): void {
    this.retrieveAllEvaluations();
  }

  public retrieveAllEvaluations(): void {
    this.isFetching = true;

    this.evaluationService()
      .retrieve()
      .then(
        res => {
          this.evaluations = res.data;
          if (this.evaluations.length!== 0) {
            this.filterService()
              .EvaluationFilter(this.evaluations, this.company_id)
              .then(res1 => {
                this.evaluations = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IEvaluation): void {
    this.removeId = instance.id!;
  }

  public removeEvaluation(): void {
    this.evaluationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Evaluation is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllEvaluations();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
