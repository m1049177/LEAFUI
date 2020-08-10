import { Component, Inject, Vue } from 'vue-property-decorator';
import { ISpend } from '../../shared/model/spend.model';
import AlertService from '../../shared/alert/alert.service';

import SpendService from './spend.service';
import { bus } from '../../../main';

@Component
export default class Spend extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('spendService') private spendService!: () => SpendService;

  public company_id: number = 0;
  private removeId: number = 0;
  public spends: ISpend[] = [];
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

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllSpends();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllSpends();
    }
  }

  public mounted(): void {
    // this.retrieveAllSpends();
  }

  public clear(): void {
    this.retrieveAllSpends();
  }

  public retrieveAllSpends(): void {
    this.isFetching = true;

    this.spendService()
      .getSpendData(this.company_id)
      .then(
        res => {
          this.spends = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ISpend): void {
    this.removeId = instance.id!;
  }

  public removeSpend(): void {
    this.spendService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Spend is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllSpends();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
