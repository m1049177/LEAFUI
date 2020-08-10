import { Component, Inject, Vue } from 'vue-property-decorator';
import { IExample } from '../../shared/model/example.model';
import AlertService from '../../shared/alert/alert.service';

import ExampleService from './example.service';

@Component
export default class Example extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('exampleService') private exampleService!: () => ExampleService;
  private removeId: number = 0;
  public examples: IExample[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;
  $refs!: {
    removeEntity: HTMLFormElement
  }
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
    this.retrieveAllExamples();
  }

  public clear(): void {
    this.retrieveAllExamples();
  }

  public retrieveAllExamples(): void {
    this.isFetching = true;

    this.exampleService()
      .retrieve()
      .then(
        res => {
          this.examples = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IExample): void {
    this.removeId = instance.id!;
  }

  public removeExample(): void {
    this.exampleService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Example is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllExamples();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
