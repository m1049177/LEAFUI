import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBusinessProcess } from '../../shared/model/business-process.model';
import AlertService from '../../shared/alert/alert.service';

import BusinessProcessService from './business-process.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class BusinessProcess extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('businessProcessService') private businessProcessService!: () => BusinessProcessService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public businessProcesses: IBusinessProcess[] = [];
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
      this.retrieveAllBusinessProcesss();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllBusinessProcesss();
    }
  }
  public mounted(): void {
    // this.retrieveAllBusinessProcesss();
  }

  public clear(): void {
    this.retrieveAllBusinessProcesss();
  }

  public retrieveAllBusinessProcesss(): void {
    this.isFetching = true;

    this.businessProcessService()
      .retrieve()
      .then(
        res => {
          this.businessProcesses = res.data;
          if (this.businessProcesses.length!== 0) {
            this.filterService()
              .BusinessProcessFilter(this.businessProcesses, this.company_id)
              .then(res1 => {
                this.businessProcesses = res1;
                this.isFetching = false;
              });
          }
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.error(err);
      this.isFetching = false;
     });
  }

  public prepareRemove(instance: IBusinessProcess): void {
    this.removeId = instance.id!;
  }

  public removeBusinessProcess(): void {
    this.businessProcessService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A BusinessProcess is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllBusinessProcesss();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
