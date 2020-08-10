import { Component, Inject, Vue } from 'vue-property-decorator';
import { IIssue } from '../../shared/model/issue.model';
import AlertService from '../../shared/alert/alert.service';

import IssueService from './issue.service';

@Component
export default class Issue extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('issueService') private issueService!: () => IssueService;
  private removeId: number = 0;
  public issues: IIssue[] = [];
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
    this.retrieveAllIssues();
  }

  public clear(): void {
    this.retrieveAllIssues();
  }

  public retrieveAllIssues(): void {
    this.isFetching = true;

    this.issueService()
      .retrieve()
      .then(
        res => {
          this.issues = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IIssue): void {
    this.removeId = instance.id!;
  }

  public removeIssue(): void {
    this.issueService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Issue is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllIssues();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
