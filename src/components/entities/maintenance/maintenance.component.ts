import { Component, Inject, Vue } from 'vue-property-decorator';
import { IMaintenance } from '../../shared/model/maintenance.model';
import AlertService from '../../shared/alert/alert.service';

import MaintenanceService from './maintenance.service';

@Component
export default class Maintenance extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('maintenanceService') private maintenanceService!: () => MaintenanceService;
  private removeId: number = 0;
  public maintenances: IMaintenance[] = [];
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
    this.retrieveAllMaintenances();
  }

  public clear(): void {
    this.retrieveAllMaintenances();
  }

  public retrieveAllMaintenances(): void {
    this.isFetching = true;

    this.maintenanceService()
      .retrieve()
      .then(
        res => {
          this.maintenances = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IMaintenance): void {
    this.removeId = instance.id!;
  }

  public removeMaintenance(): void {
    this.maintenanceService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Maintenance is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllMaintenances();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
