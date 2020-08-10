import { Component, Inject, Vue } from 'vue-property-decorator';
import { IApplication } from '../../shared/model/application.model';
import AlertService from '../../shared/alert/alert.service';

import ApplicationService from './application.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Application extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('filterService') private filterService!: () => FilterService;
  private removeId: number = 0;
  public applications: IApplication[] = [];
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
      this.retrieveAllApplications();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllApplications();
    }
  }

  public mounted(): void {
    this.retrieveAllApplications();
  }

  public clear(): void {
    this.retrieveAllApplications();
  }

  public retrieveAllApplications(): void {
    this.isFetching = true;

    this.applicationService()
      .retrieve()
      .then(
        res => {
          this.applications = res.data;
          if (this.applications.length!== 0) {
            this.filterService()
              .ApplicationFilter(this.applications, this.company_id)
              .then(res1 => {
                this.applications = res1;
              });
          }

          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.log(err);
        this.isFetching = false;
       });
  }

  public prepareRemove(instance: IApplication): void {
    this.removeId = instance.id!;
  }

  public removeApplication(): void {
    this.applicationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Application is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllApplications();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
