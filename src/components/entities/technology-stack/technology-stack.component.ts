import { Component, Inject, Vue } from 'vue-property-decorator';
import { ITechnologyStack } from '../../shared/model/technology-stack.model';
import AlertService from '../../shared/alert/alert.service';

import TechnologyStackService from './technology-stack.service';

@Component
export default class TechnologyStack extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologyStackService') private technologyStackService!: () => TechnologyStackService;
  private removeId: number = 0;
  public technologyStacks: ITechnologyStack[] = [];
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
    this.retrieveAllTechnologyStacks();
  }

  public clear(): void {
    this.retrieveAllTechnologyStacks();
  }

  public retrieveAllTechnologyStacks(): void {
    this.isFetching = true;

    this.technologyStackService()
      .retrieve()
      .then(
        res => {
          this.technologyStacks = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ITechnologyStack): void {
    this.removeId = instance.id!;
  }

  public removeTechnologyStack(): void {
    this.technologyStackService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TechnologyStack is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllTechnologyStacks();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
