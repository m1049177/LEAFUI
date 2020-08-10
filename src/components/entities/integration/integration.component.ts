import { Component, Inject, Vue } from 'vue-property-decorator';
import { IIntegration } from '../../shared/model/integration.model';
import AlertService from '../../shared/alert/alert.service';

import IntegrationService from './integration.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Integration extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('integrationService') private integrationService!: () => IntegrationService;
  private removeId: number = 0;
  public integrations: IIntegration[] = [];
  @Inject('filterService') private filterService!: () => FilterService;
  $refs!: {
    removeEntity: HTMLFormElement
  }
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
      this.retrieveAllIntegrations();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllIntegrations();
    }
  }

  public mounted(): void {
    // this.retrieveAllIntegrations();
  }

  public clear(): void {
    this.retrieveAllIntegrations();
  }

  public retrieveAllIntegrations(): void {
    this.isFetching = true;

    this.integrationService()
      .retrieve()
      .then(
        res => {
          this.integrations = res.data;
          if (this.integrations.length!== 0) {
            this.filterService()
              .IntegrationFilter(this.integrations, this.company_id)
              .then(response => {
                this.integrations = response;
              });
          }

          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IIntegration): void {
    this.removeId = instance.id!;
  }

  public removeIntegration(): void {
    this.integrationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Integration is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllIntegrations();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
