import { Component, Vue, Inject } from 'vue-property-decorator';

import { IReport } from '../../shared/model/report.model';
import ReportService from './report.service';

@Component
export default class ReportDetails extends Vue {
  @Inject('reportService') private reportService!: () => ReportService;
  public report: IReport = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.reportId) {
        vm.retrieveReport(to.params.reportId);
      }
    });
  }

  public retrieveReport(reportId: number) {
    this.reportService()
      .find(reportId)
      .then(res => {
        this.report = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
