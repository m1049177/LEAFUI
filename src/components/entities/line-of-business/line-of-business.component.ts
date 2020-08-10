import { Component, Inject, Vue } from 'vue-property-decorator';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';
import AlertService from '../../shared/alert/alert.service';

import LineOfBusinessService from './line-of-business.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class LineOfBusiness extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('filterService') private filterService!: () => FilterService;

  $refs!: {
    removeEntity: HTMLFormElement
  }
  private removeId: number = 0;
  public lineOfBusinesses: ILineOfBusiness[] = [];
  public company_id: number = 0;

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
      this.retrieveAllLineOfBusinesss();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllLineOfBusinesss();
    }
  }
  public mounted(): void {}

  public clear(): void {
    this.retrieveAllLineOfBusinesss();
  }

  public retrieveAllLineOfBusinesss(): void {
    this.isFetching = true;

    this.lineOfBusinessService()
      .retrieve()
      .then(
        res => {
          this.lineOfBusinesses = res.data;
          this.filterService()
            .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
            .then(response => {
              this.lineOfBusinesses = response;
            });
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ILineOfBusiness): void {
    this.removeId = instance.id!;
  }

  public removeLineOfBusiness(): void {
    this.lineOfBusinessService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A LineOfBusiness is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllLineOfBusinesss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
