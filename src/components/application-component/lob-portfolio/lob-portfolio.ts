import { Component, Inject, Vue } from 'vue-property-decorator';
import ApplicationService from '../../entities/application/application.service';
import LineOfBusinessService from '../../entities/line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';
import { IApplication } from '../../shared/model/application.model';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';
import LabelService from '../../entities/label/label.service';
import SpendService from '../../entities/spend/spend.service';
import { ISpend } from '../../shared/model/spend.model';
import { IApplicationData } from '../../shared/model/applicationData.model';

@Component
export default class LobPortfolio extends Vue {
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('spendService') private spendService!: () => SpendService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('labelService') private labelService!: () => LabelService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  lineOfBusinesses: ILineOfBusiness[] = [];
  applications: IApplication[] = [];
  lobApplicationDetails: any[] = [];
  lobApplicationsCount: any[] = [];
  lobSpendDetails: any[] = [];
  status = '';
  spend = '';
  public spends: ISpend[] = [];
  public applications_Spend: number[] = [];
  public applicationData: IApplicationData[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.appStatus) {
        vm.setStatus(to.params.appStatus);
      }
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveLobDetails().then(res => {
        this.retrieveAllLineOfBusinessesData();
      }).catch(function(error) { console.log(error); })
    });

    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveLobDetails().then(res => {
        this.retrieveAllLineOfBusinessesData()
      }).catch(function(error) { console.log(error); })
    }
    
  }
  public setStatus(app_status: string) {
    this.status = app_status;
    console.log(this.status);
  }

  public retrieveLobDetails() {
    return new Promise(resolve => {
      this.spends = [];
      this.applicationData = [];
      this.lineOfBusinesses = [];
      this.lobSpendDetails = [];
      this.spendService()
        .getSpendData(this.company_id)
        .then(res => {
          this.spends = res.data;
          this.spendService()
            .retrieveApplicationData(this.company_id)
            .then(
              response => {
                this.applicationData = response.data;
                this.lineOfBusinessService()
                  .retrieve()
                  .then(res1 => {
                    this.lineOfBusinesses = res1.data;
                    this.filterService()
                      .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
                      .then(response1 => {
                        this.lineOfBusinesses = response1;
                        this.applications_Spend = [0, 0, 0, 0, 0];
                        this.lineOfBusinesses.forEach(lob => {
                          let lobSpend = 0;
                          this.spends.forEach(element => {
                            this.applicationData.forEach(app => {
                              if (
                                lob.id === app.data.application.lineOfBusiness.id &&
                                element.spendId === app.data.id &&
                                element.expenditureType === app.type &&
                                app.status === this.status
                              ) {
                                lobSpend = lobSpend + element.amount!;
                                console.log(lobSpend);
                              }
                            });
                          });
                          this.lobSpendDetails.push({ lobName: lob.name, spend: lobSpend, status: this.status });
                        });
                      });
                  });
                console.log(this.lobSpendDetails);
              },
              error => {
                console.log(error);
              }
            );
        }).catch(function(error) {
          console.log(error);
        })
      resolve(this.lobSpendDetails);
    });
  }

  public retrieveAllLineOfBusinessesData() {
    this.lineOfBusinesses = [];
    this.applications = [];
    this.lineOfBusinessService()
      .retrieve()
      .then(res => {
        this.lineOfBusinesses = res.data;
        this.filterService()
          .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
          .then(response => {
            this.lineOfBusinesses = response;
            this.applicationService()
              .retrieve()
              .then(response1 => {
                this.applications = response1.data;
                if (this.applications.length!== 0) {
                  this.filterService()
                    .ApplicationFilter(this.applications, this.company_id)
                    .then(res1 => {
                      this.applications = res1;
                      this.lineOfBusinesses.forEach(lob => {
                        let count = 0;
                        this.applications.forEach(app => {
                          if (lob.id === app.lineOfBusiness?.id && app.status === this.status) {
                            // this.lobApplicationDetails.push({ "lobName": lob.name, "application": app })
                            count++;
                          }
                        });
                        this.lobApplicationsCount.push({ lobName: lob.name, applicationsCount: count });
                      });
                    });
                }
              });
          });
      }).catch(function(error) { console.log(error); })
  }
  get2DArrary(arr: any, count: number) {
    const newArr = [];
    while (arr.length) {
      newArr.push(arr.splice(0, count));
    }
    return newArr;
  }
  public previousState() {
    this.$router.go(-1);
  }
}
