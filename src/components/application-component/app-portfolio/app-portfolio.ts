import { Component, Inject, Vue } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
import EvaluationReport from '../../entities/evaluation/evaluation.report.vue';
import UploadExcel from '../app-portfolio/UploadExcel.vue';
import SpendService from '../../entities/spend/spend.service';
import LabelService from '../../entities/label/label.service';
import { bus } from '../../../main';
import orgChartApp from '../chart/orgChartApp.vue';
import { ILabel } from '../../shared/model/label.model';
import { ISpend } from '../../shared/model/spend.model';
import { CurrencySuccessor } from '../../shared/model/spend.model';
import TechnologyService from '../../entities/technology/technology.service';
import FilterService from '../../shared/service/filter.service';
import { ITechnology } from '../../shared/model/technology.model';
import { IApplicationData } from '../../shared/model/applicationData.model';
import { IApplicationSpendDetails, IApplicationTotalSpend } from '../../shared/model/applicationSpend.model';
import { ILineOfBusiness, LineOfBusiness } from '../../shared/model/line-of-business.model';
import { IApplication } from '../../shared/model/application.model';
import LineOfBusinessService from '../../entities/line-of-business/line-of-business.service';
import ApplicationService from '../../entities/application/application.service';

@Component({
  components: {
    uploadexcel: Vue.extend(UploadExcel),
    apexchart:  Vue.extend(VueApexCharts),
    evaluationReport:  Vue.extend(EvaluationReport),
    orgChartApp
  }
})
export default class AppPortfolio extends Vue {
  @Inject('spendService') private spendService!: () => SpendService;
  @Inject('labelService') private labelService!: () => LabelService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  // @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('filterService') private filterService!: () => FilterService;

  public technologies: ITechnology[] = [];
  public company_id: number = 0;
  public labels: ILabel[] = [];
  public dashboardLabel: string[] = [];
  public spendTypeLabel: string[] = [];
  public dashboardData: ILabel = {};
  public spendType: ILabel = {};
  public applicationData: IApplicationData[] = [];
  public spends: ISpend[] = [];
  public applicationSpend: IApplicationSpendDetails[] = [];
  public applicationTotalSpend: IApplicationTotalSpend[] = [];
  dotnutOptions: any = {};
  columnBarOtions: any = {};
  columnBarseries: any = [];
  areaOptions: any = {};
  areaSeries: any = [];
  public lobNames: any[] = [];
  public currentYear = new Date().getFullYear();
  public currentYearBudgetAmount: any[] = [];
  public currentYearSpendAmount: any[] = [];
  public yearWiseLobSpendDetails: any[] = [];
  public yearWiseRunningAppSpend: any[] = [];
  public yearWiseGrowingAppSpend: any[] = [];
  public yearsArray: any[] = [];
  toggleRunningStatus = false;
  toggleInProgressStatus = false;
  colors: string[] = ['#7eccb1', '#6dc6ee', '#ed3d79'];
  public dropdown = false;
  public selectedLOB = '';
  selectedLOBApp = 0;
  public Lobs: ILineOfBusiness[] = [];
  public applications: IApplication[] = [];
  public dropDownData = ['LineOfBusiness', 'Application', 'Technology'];
  selectedAppId = 0;
  selectedAppName = '';
  max = 100;
  value = 75;
  public busStatus = false;

  public created(): void {
    this.busStatus = false;
    bus.$on('CompanyChange', (obj: any) => {
      if(this.company_id === parseInt(obj)) {
        this.busStatus = true;
        this.company_id = parseInt(obj);
        this.retrieveLabelData().then(res => {
          this.retrieveApplicationData();
          this.retriveYearlySpendAndBudget();
        });
        this.retrieveAllLOB();
      }
    });
    if (this.company_id === 0 || this.company_id === NaN && this.busStatus === false) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      console.log(this.company_id);
      this.retrieveLabelData().then(res => {
        this.retrieveApplicationData();
        this.retriveYearlySpendAndBudget();
      });
      this.retrieveAllLOB();
    }

    bus.$on('appDetails', (data: any) => {
      this.selectedAppId = parseInt(data.id);
      this.selectedAppName = data.name;
      console.log(this.selectedAppId);
    });
  }

  public retrieveLabelData() {
    return new Promise(resolve => {
      this.dashboardLabel = [];
      this.labels = [];
      this.spendTypeLabel = [];
      this.dashboardData = {};
      this.spendType = {};
      this.labelService()
        .retrieve()
        .then(res => {
          this.labels = res.data;
          this.labels = this.labels.filter(element => element.company?.id === this.company_id);
          this.labels.forEach(labelData => {
            if (labelData.label_type === 'Dashboard') {
              this.dashboardData = labelData;
              this.dashboardData.label_data = JSON.parse(this.dashboardData.label_data);
              this.dashboardData.label_data.forEach((item: any) => {
                this.dashboardLabel.push(item.name);
              });
            }
            if (labelData.label_type === 'SpendType') {
              this.spendType = labelData;
              this.spendType.label_data = JSON.parse(this.spendType.label_data);
              this.spendType.label_data.forEach((item: any) => {
                this.spendTypeLabel.push(item.name);
              });
            }
          });
          console.log(this.dashboardLabel);
          console.log(this.spendTypeLabel);
          resolve(this.spendType);
        });
    });
  }

  public retrieveApplicationData() {
    console.log(this.company_id);
    this.applicationSpend = [];
    this.applicationData = [];
    this.applicationTotalSpend = [];
    this.spends = [];
    this.spendService()
      .retrieveApplicationData(this.company_id)
      .then(res => {
        this.applicationData = res.data;
        // console.log(this.applicationData);
        this.spendService()
          .getSpendData(this.company_id)
          .then(response => {
            this.spends = response.data;
            // console.log(this.spends);
            const spendValue: any = [];
            this.dashboardLabel.forEach(status => {
              const spendDetails: number[] = [];
              const spend_Type: string[] = [];
              this.spendTypeLabel.forEach(spend_type => {
                let spendAmount = 0;
                this.spends.forEach(element => {
                  // console.log(element);
                  this.applicationData.forEach(app => {
                    if (element.spendId === app.data?.id && element.expenditureType === app.type && app.status === status) {
                      if (app.type === spend_type) {
                        spendAmount = this.conversionMethod(spendAmount, element.amount!, element.successor);
                        //spendAmount = spendAmount + element.amount;
                        // console.log(spendAmount);
                      }
                    }
                  });
                });
                spendDetails.push(spendAmount);
                spend_Type.push(spend_type);
              });
              this.applicationSpend.push({status: status, spendDetails: spendDetails, spend_type: spend_Type });
              const totalSpend = spendDetails.reduce((total: number, value: number) => total + value, 0);
              spendValue.push(totalSpend);
              let totalAmount = "";
              if (totalSpend > 1000) {
                totalAmount = (totalSpend / 1000).toFixed(2) + 'M';
              } else {
                totalAmount = totalSpend + 'K';
              }
              this.applicationTotalSpend.push({ status: status, total_spend: totalAmount });
              console.log(spendValue);
              this.value = (spendValue[0] / (spendValue[0] + spendValue[1])) * 100;
            });

            this.dotnutOptions = {
              colors: ['#049bde', '#04d18a', '#E91E63', '#5884a6', '#ed3d79'],
              responsive: [
                {
                  breakpoint: 1600,
                  options: {
                    chart: {
                      width: 230,
                      toolbar: {
                        show: false
                      }
                    }
                  }
                }
              ],
              labels: this.spendTypeLabel,
              legend: {
                show: true,
                position: 'bottom'
              }
            };
          });
      });
  }

  public conversionMethod(spendAmount: number, amount: number, successor: any) {
    if (successor === CurrencySuccessor.M) {
      spendAmount = spendAmount + amount * 1000;
    } else {
      spendAmount = spendAmount + amount;
    }
    return spendAmount;
  }
  public navigateFunction(type: string): void {
    this.$router.push({ name: 'LobPortfolio', params: { appStatus: type } });
  }

  public retriveYearlySpendAndBudget() {
    this.spendService()
      .retrieveSpendAndBudgetDetails(this.company_id)
      .then(res => {
        console.log(res.data);
        this.yearsArray = res.data[0];
        this.yearWiseRunningAppSpend = res.data[1];
        this.yearWiseGrowingAppSpend = res.data[2];
        this.lobNames = res.data[3];
        this.currentYearSpendAmount = res.data[4];
        this.currentYearBudgetAmount = res.data[5];
        this.areaSeries = [
          {
            name: 'Running',
            data: this.yearWiseRunningAppSpend
          },
          {
            name: 'Growing',
            data: this.yearWiseGrowingAppSpend
          }
        ];
        this.areaOptions = {
          chart: {
            // height:"100%",
            toolbar: {
              show: false,
              tools: {
                download: true
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
            position: 'top'
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: this.yearsArray
          },
          tooltip: {
            x: {
              format: 'yyyy'
            }
          },
          colors: this.colors
        };
        this.columnBarseries = [
          {
            name: 'Spend',
            type: 'bar',
            data: this.currentYearSpendAmount
          },
          {
            name: 'Budget',
            type: 'bar',
            data: this.currentYearBudgetAmount
          }
        ];
        this.columnBarOtions = {
          colors: ['#049bde', '#ed3d79'],
          chart: {
            // height:"100%",
            toolbar: {
              show: false,
              tools: {
                download: true
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
            position: 'top'
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['#049bde', '#ed3d79']
          },
          xaxis: {
            categories: this.lobNames,
            show: true,
            labels: {
              show: false
            },
            title: {
              text: 'Line Of Businessess'
            }
          },
          yaxis: {
            title: {
              text: '$ (thousands)'
            }
          },
          fill: {
            opacity: 1
          },
          toolbar: {
            show: false
          }
        };
      });
  }

  public labelEdit(label: string) {
    document.getElementById(label)!.focus();
  }

  public labelChange() {
    this.dashboardData.label_data = JSON.stringify(this.dashboardData.label_data);
    console.log(this.dashboardLabel);
    this.labelService()
      .update(this.dashboardData)
      .then(res => {
        console.log('successfully updated', res.id);
        this.retrieveLabelData();
      });
  }

  public toggle(id: string) {
    console.log('inside toggle');
    this.$root.$emit('bv::toggle::collapse', id);
    if (id === 'Running') {
      this.toggleRunningStatus = !this.toggleRunningStatus;
      this.toggleRunningStatus
        ? (document.getElementById(id + 'btn')!.innerHTML = 'Show Less')
        : (document.getElementById(id + 'btn')!.innerHTML = 'View More');
    } else {
      this.toggleInProgressStatus = !this.toggleInProgressStatus;
      this.toggleInProgressStatus
        ? (document.getElementById(id + 'btn')!.innerHTML = 'Show Less')
        : (document.getElementById(id + 'btn')!.innerHTML = 'View More');
    }
  }

  // public add() {
  //   this.dropdown = true;
  //   this.$router.push({ name: this.selectedLOB + 'Create' });
  // }

  public changeInDropdown() {
    console.log(this.selectedLOB);
  }

  // public retrieveAllTechnology(): void {
  //   this.technologyService()
  //     .retrieve()
  //     .then(res => {
  //       this.technologies = res.data;
  //       if (this.technologies.length !== 0) {
  //         this.filterService()
  //           .TechnologyFilter(this.technologies, this.company_id)
  //           .then(respose => {
  //             this.technologies = respose;
  //           });
  //       }
  //     });
  // }

  public retrieveAllLOB() {
    this.lineOfBusinessService().retrieve().then(res => {
      this.Lobs = res.data;
      this.Lobs = this.Lobs.filter(lob => lob.oraganizationalUnit?.company?.id === this.company_id);
      this.selectedLOB = this.Lobs[0].name!;
      this.applicationService().retrieve().then(response => {
        this.applications = response.data;
        this.applications = this.applications.filter(app => app.lineOfBusiness?.oraganizationalUnit?.company?.id === this.company_id)
      })
    })
  }
  public integration(appId: any) {
    this.$router.push({name: 'IntegrationApp', params: { appId } });
  }
}
