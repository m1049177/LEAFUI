import { Component, Inject, Vue } from 'vue-property-decorator';
import EvaluationService from './evaluation.service';
import { IEvaluation } from '../../shared/model/evaluation.model';
import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';
import VueApexCharts from 'vue-apexcharts';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class EvaluationReport extends Vue {
  @Inject('evaluationService') private evaluationService!: () => EvaluationService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('filterService') private filterService!: () => FilterService;
  public company_id: number = 0;

  public applications: IApplication[] = [];
  public evaluations: IEvaluation[] = [];
  public reportData: any[] = [];
  public selectedApplication = '';
  public attemptNo = 0;
  public category = ' ';
  public passed = 0;
  public failed = 0;
  public score: number[] = [];
  public date: Date[] = [];
  public ChartCategories: string[] = ['Passed', 'Failed'];
  colors: string[] = ['#73b386', '#e06f73'];
  public chartOptions: any = {};

  public assessmentCategory: string[] = [
    'ARCHITECTUREPRINCIPLE',
    'DEPLOYMENT',
    'INTERNATIONALIZATION',
    'SECURITY',
    'AVAILABILITY',
    'SCALABILITY',
    'RELIABILITY',
    'MAINTAINABILITY',
    'DATAARCHITECTURE'
  ];

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveApplicationDetails();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveApplicationDetails();
    }
  }

  public mounted(): void {
    // this.retrieveApplicationDetails();
    this.chartOptions = {
      labels: this.ChartCategories,
      colors: ['#73b386', '#e06f73'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  public retrieveApplicationDetails() {
    this.evaluationService()
      .retrieve()
      .then(
        res => {
          this.evaluations = res.data;
          if (this.evaluations.length!== 0) {
            this.filterService()
              .EvaluationFilter(this.evaluations, this.company_id)
              .then(res1 => {
                this.evaluations = res;
              })
          }
          this.applicationService()
            .retrieve()
            .then(response => {
              this.applications = response.data;
              if (this.applications.length!== 0) {
                this.filterService()
                  .ApplicationFilter(this.applications, this.company_id)
                  .then(data => {
                    this.applications = data;
                    this.selectedApplication = this.applications[0].name!;
                    this.retrieveEvaluationData();
                  });
              }
            }).catch(err => { console.error(err) });
        },
        error => {
          console.log(error);
        }
      ).catch(err => { console.error(err) });
  }

  public applicationChange() {
    console.log(this.selectedApplication);
    this.retrieveEvaluationData();
  }

  public retrieveEvaluationData() {
    this.reportData = [];
    this.assessmentCategory.forEach(item => {
      this.evaluations.forEach(element => {
        if (element.application?.name === this.selectedApplication && item === element.assessmentCategory) {
          this.category = element.assessmentCategory;
          this.attemptNo = this.attemptNo + 1;
          this.date.push(element.attemptDate!);
          if (element.score! > 50) {
            this.passed = this.passed + 1;
          } else {
            this.failed = this.failed + 1;
          }
        }
      });
      if (this.attemptNo !== 0 && this.category !== ' ') {
        this.score.push(this.passed, this.failed);
        this.reportData.push({ category: this.category, attemptNo: this.attemptNo, score: this.score, date: this.date });
      }
      this.passed = 0;
      this.failed = 0;
      this.attemptNo = 0;
      this.date = [];
      this.score = [];
    });
    console.log(this.reportData);
  }

  public hideModal() {
    console.log('Called');
    this.$root.$emit('bv::hide::modal', 'applicationReport');
  }
}
