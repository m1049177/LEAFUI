import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBusinessFunction } from '../../shared/model/business-function.model';
import AlertService from '../../shared/alert/alert.service';

import BusinessFunctionService from './business-function.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class BusinessFunction extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('businessFunctionService') private businessFunctionService!: () => BusinessFunctionService;
  @Inject('filterService') private filterService!: () => FilterService;

  private removeId: number = 0;
  public businessFunctions: IBusinessFunction[] = [];
  public company_id: number = 0;

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
      this.retrieveAllBusinessFunctions();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllBusinessFunctions();
    }
  }
  public mounted(): void {
    // this.retrieveAllBusinessFunctions();
  }

  public clear(): void {
    this.retrieveAllBusinessFunctions();
  }

  public retrieveAllBusinessFunctions(): void {
    this.isFetching = true;

    this.businessFunctionService()
      .retrieve()
      .then(
        res => {
          this.businessFunctions = res.data;
          if (this.businessFunctions.length!== 0) {
            this.filterService()
              .BusinessFunctionFilter(this.businessFunctions, this.company_id)
              .then(res1 => {
                this.businessFunctions = res1;
              });
          }
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

  public prepareRemove(instance: IBusinessFunction): void {
    this.removeId = instance.id!;
  }

  public removeBusinessFunction(): void {
    this.businessFunctionService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A BusinessFunction is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllBusinessFunctions();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
