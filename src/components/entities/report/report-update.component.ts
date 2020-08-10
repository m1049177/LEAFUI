import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IReport, Report } from '../../shared/model/report.model';
import ReportService from './report.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

const validations: any = {
  report: {
    name: {
      required
    },
    type: {
      required
    },
    reportingTool: {
      required
    }
  }
};

@Component({
  validations
})
export default class ReportUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('reportService') private reportService!: () => ReportService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public report: IReport = new Report();

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.reportId) {
        vm.retrieveReport(to.params.reportId);
      }
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.initRelationships();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.initRelationships();
    }
  }
  public save(): void {
    this.isSaving = true;
    if (this.report.id) {
      this.reportService()
        .update(this.report)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Report is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.reportService()
        .create(this.report)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Report is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveReport(reportId: number): void {
    this.reportService()
      .find(reportId)
      .then(res => {
        this.report = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.applicationService()
      .retrieve()
      .then(res => {
        this.applications = res.data;
        if (this.applications.length!== 0) {
          this.filterService()
            .ApplicationFilter(this.applications, this.company_id)
            .then(res1 => {
              this.applications = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
