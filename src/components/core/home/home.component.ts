import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginService from '../../account/login.service';
import VueApexCharts from 'vue-apexcharts';
import { ISpend, CurrencySuccessor } from '../../shared/model/spend.model';
import SpendService from '../../entities/spend/spend.service';
import { bus } from '../../../main';
import LabelService from '../../entities/label/label.service';
import { ILabel } from '../../shared/model/label.model';
import { IApplicationData } from '../../shared/model/applicationData.model';
import { IApplicationTotalSpend } from '../../shared/model/applicationSpend.model';

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class Home extends Vue {
  @Inject('loginService') private loginService!: () => LoginService;
  @Inject('spendService') private spendService!: () => SpendService;
  @Inject('labelService') private labelService!: () => LabelService;

  public company_id: number = 0;
  public labels: ILabel[] = [];
  public dashboardLabel: string[]= [];
  public spendTypeLabel: string[] = [];
  public dashboardData: ILabel = {};
  public spendType: ILabel = {};
  public applicationData: IApplicationData[] = [];
  public spends: ISpend[] = [];
  public applicationSpend: any[] = [];
  public applicationTotalSpend: IApplicationTotalSpend[] = [];
  dotnutOptions: any = {};
  max = 100;
  value = 75;
  public busStatus = false;

  public openLogin(): void {
    this.loginService().openLogin(this.$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }

  public get userid(): number {
    return this.$store.getters.account.id;
  }
  public created(): void {
    this.busStatus = false;
    bus.$on('CompanyChange', (obj: any) => {
      console.log(obj, this.company_id);
      if(parseInt(obj)!== this.company_id) {
        this.busStatus = true;
        this.company_id = parseInt(obj);
        this.retrieveLabelData().then(res => {
          this.retrieveApplicationData();
        });
      }
    });
    if(this.company_id === 0 && this.busStatus === false) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveLabelData().then(res => {
        this.retrieveApplicationData();
      });
    }
  //   if(!this.busStatus && this.company_id === 0) {
  //     this.company_id = parseInt(localStorage.getItem('CompanyId')!);
  //     if(this.company_id!== 0) {
  //       this.retrieveLabelData().then(res => {
  //         this.retrieveApplicationData();
  //       });
  //   }
  // }
    // if (this.company_id === 0) {
    //   this.company_id = parseInt(localStorage.getItem('CompanyId')!);
    //   console.log("inside if")
    //   if(this.company_id!== 0) {
    //     console.log('inside if if')
    //     this.retrieveLabelData().then(res => {
    //       this.retrieveApplicationData();
    //     });
    //   }

    // }
  }

  public retrieveLabelData() {
    return new Promise(resolve => {
      this.dashboardLabel = [];
      this.spendTypeLabel = [];
      this.dashboardData = {};
      this.spendType = {};
      this.labels = [];
      this.labelService()
        .retrieve()
        .then(res => {
          this.labels = res.data;
          console.log(this.labels);
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
          resolve(this.spendType);
        });
    });
  }

  public retrieveApplicationData() {
    console.log("inside application")
    this.applicationSpend = [];
    this.applicationTotalSpend = [];
    this.applicationData = [];
    this.spendService()
      .retrieveApplicationData(this.company_id)
      .then(res => {
        this.applicationData = res.data;
        console.log(this.applicationData);
        this.spendService()
          .getSpendData(this.company_id)
          .then(response => {
            this.spends = response.data;
            console.log(this.spends);
            const spendValue: any = [];
            this.dashboardLabel.forEach(status => {
              const spendDetails: number[] = [];
              const spend_Type: string[] = [];
              this.spendTypeLabel.forEach(spend_type => {
                let spendAmount = 0;
                this.spends.forEach(element => {
                  this.applicationData.forEach(app => {
                    if (element.spendId === app.data.id && element.expenditureType === app.type && app.status === status) {
                      if (app.type === spend_type) {
                        spendAmount = this.conversionMethod(spendAmount, element.amount!, element.successor);
                        // spendAmount = spendAmount + element.amount;
                        // console.log(spendAmount);
                      }
                    }
                  });
                });
                spendDetails.push(spendAmount);
                spend_Type.push(spend_type);
              });
              this.applicationSpend.push({ status: status, spendDetails: spendDetails, spend_type: spend_Type });
              const totalSpend = spendDetails.reduce((total, value) => total + value, 0);
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
            console.log(this.applicationSpend);
            console.log(this.applicationTotalSpend);
            this.dotnutOptions = {
              colors: ['#049bde', '#04d18a', '#E91E63', '#5884a6', '#9C27B0'],
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

  public labelEdit(label: string) {
    console.log('edit function');
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

  // public searching() {
  //   this.applicationService().search('Mining').then(res => {
  //     console.log(res);
  //   });
  // }
}
