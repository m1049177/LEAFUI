import { Component, Inject, Vue } from 'vue-property-decorator';
import { IExpenditure } from '../../shared/model/expenditure.model';
import AlertService from '../../shared/alert/alert.service';

import ExpenditureService from './expenditure.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Expenditure extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('expenditureService') private expenditureService!: () => ExpenditureService;
  @Inject('filterService') private filterService!: () => FilterService;
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public company_id: number = 0;
  private removeId: number = 0;
  public expenditures: IExpenditure[] = [];

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
      this.retrieveAllExpenditures();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllExpenditures();
    }
  }
  public mounted(): void {
    // this.retrieveAllExpenditures();
  }

  public clear(): void {
    this.retrieveAllExpenditures();
  }

  public retrieveAllExpenditures(): void {
    this.isFetching = true;

    this.expenditureService()
      .retrieve()
      .then(
        res => {
          this.expenditures = res.data;
          if (this.expenditures.length!== 0) {
            this.filterService()
              .ExpenditureFilter(this.expenditures, this.company_id)
              .then(res1 => {
                this.expenditures = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IExpenditure): void {
    this.removeId = instance.id!;
  }

  public removeExpenditure(): void {
    this.expenditureService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Expenditure is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllExpenditures();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
