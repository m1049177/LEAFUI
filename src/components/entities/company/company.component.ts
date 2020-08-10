import { Component, Inject, Vue } from 'vue-property-decorator';
import { ICompany } from '../../shared/model/company.model';
import AlertService from '../../shared/alert/alert.service';

import CompanyService from './company.service';

@Component
export default class Company extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('companyService') private companyService!: () => CompanyService;
  private removeId: number = 0;
  public companies: ICompany[] = [];
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
    this.retrieveAllCompanys();
  }

  public clear(): void {
    this.retrieveAllCompanys();
  }

  public retrieveAllCompanys(): void {
    this.isFetching = true;

    this.companyService()
      .retrieve()
      .then(
        res => {
          this.companies = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ICompany): void {
    this.removeId = instance.id!;
  }

  public removeCompany(): void {
    this.companyService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Company is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllCompanys();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
