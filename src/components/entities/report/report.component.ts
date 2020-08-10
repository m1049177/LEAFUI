import { Component, Inject, Vue } from 'vue-property-decorator';
import { IReport } from '../../shared/model/report.model';
import AlertService from '../../shared/alert/alert.service';

import ReportService from './report.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Report extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('reportService') private reportService!: () => ReportService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public reports: IReport[] = [];
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
      this.retrieveAllReports();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllReports();
    }
  }
  public mounted(): void {
    // this.retrieveAllReports();
  }

  public clear(): void {
    this.retrieveAllReports();
  }

  public retrieveAllReports(): void {
    this.isFetching = true;

    this.reportService()
      .retrieve()
      .then(
        res => {
          this.reports = res.data;
          if (this.reports.length!== 0) {
            this.filterService()
              .ReportFilter(this.reports, this.company_id)
              .then(res1 => {
                this.reports = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IReport): void {
    this.removeId = instance.id!;
  }

  public removeReport(): void {
    this.reportService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Report is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllReports();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
