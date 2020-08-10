import { Component, Inject, Vue } from 'vue-property-decorator';
import { IRevenue } from '../../shared/model/revenue.model';
import AlertService from '../../shared/alert/alert.service';

import RevenueService from './revenue.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

@Component
export default class Revenue extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('revenueService') private revenueService!: () => RevenueService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public revenues: IRevenue[] = [];
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
      this.retrieveAllRevenues();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllRevenues();
    }
  }

  public mounted(): void {
    // this.retrieveAllRevenues();
  }

  public clear(): void {
    this.retrieveAllRevenues();
  }

  public retrieveAllRevenues(): void {
    this.isFetching = true;

    this.revenueService()
      .retrieve()
      .then(
        res => {
          this.revenues = res.data;
          if (this.revenues.length!== 0) {
            this.filterService()
              .RevenueFilter(this.revenues, this.company_id)
              .then(result => {
                this.revenues = result;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IRevenue): void {
    this.removeId = instance.id!;
  }

  public removeRevenue(): void {
    this.revenueService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Revenue is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllRevenues();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
