import { Component, Inject, Vue } from 'vue-property-decorator';
import { IChange } from '../../shared/model/change.model';
import AlertService from '../../shared/alert/alert.service';

import ChangeService from './change.service';

@Component
export default class Change extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('changeService') private changeService!: () => ChangeService;
  private removeId: number = 0;
  public changes: IChange[] = [];

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
    this.retrieveAllChanges();
  }

  public clear(): void {
    this.retrieveAllChanges();
  }

  public retrieveAllChanges(): void {
    this.isFetching = true;

    this.changeService()
      .retrieve()
      .then(
        res => {
          this.changes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IChange): void {
    this.removeId = instance.id!;
  }

  public removeChange(): void {
    this.changeService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Change is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllChanges();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
