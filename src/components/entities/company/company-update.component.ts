import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import UserService from '../../admin/user-management/user-management.service';

import AlertService from '../../shared/alert/alert.service';
import { ICompany, Company } from '../../shared/model/company.model';
import CompanyService from './company.service';
import { ILabel, Label } from '../../shared/model/label.model';
import LabelService from '../label/label.service';

const validations: any = {
  company: {
    companyName: {
      required
    },
    description: {
      required
    }
  }
};

@Component({
  validations
})
export default class CompanyUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('companyService') private companyService!: () => CompanyService;
  @Inject('labelService') private labelService!: () => LabelService;
  public company: ICompany = new Company();
  public technologyBudget = ['CLIENT', 'SERVER', 'CLOUD', 'DATABASE', 'STORAGE', 'MIDDLEWARE'];
  public spendType = ['INFRA', 'LICENSE', 'DEVELOPMENT', 'ENHANCEMENT', 'SUPPORTCOST', 'MISCELLANEOUS'];
  public Dashboard = ['Running', 'InProgress'];
  public label: ILabel = new Label();
  public CompanyDetail: ICompany = {};
  technologyData: any[] = [];
  dashBoardData: any[] = [];
  spendData: any[] = [];

  @Inject('userService') private userService!: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.companyId) {
        vm.retrieveCompany(to.params.companyId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.company.id) {
      this.companyService()
        .update(this.company)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Company is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.companyService()
        .create(this.company)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Company is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
          this.addDefaultData(param.id!);
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveCompany(companyId: number): void {
    this.companyService()
      .find(companyId)
      .then(res => {
        this.company = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }

  public addDefaultData(id: number) {
    this.companyService()
      .find(id)
      .then(res => {
        this.CompanyDetail = res;
        console.log(this.CompanyDetail);
        this.technologyBudget.forEach(element => {
          const data1 = {
            name: element,
            label_id: element
          };
          this.technologyData.push(data1);
        });
        this.label.company = this.CompanyDetail;
        this.label.label_data = JSON.stringify(this.technologyData);
        this.label.label_type = 'TechnologyBudget';
        this.labelService()
          .create(this.label)
          .then(res1 => {
            console.log('Added successfully');
            this.Dashboard.forEach(element => {
              const data = {
                name: element,
                label_id: element
              };
              this.dashBoardData.push(data);
            });
            this.label.label_data = JSON.stringify(this.dashBoardData);
            this.label.label_type = 'Dashboard';
            this.labelService()
              .create(this.label)
              .then(res2 => {
                console.log('Added successfully');
                this.spendType.forEach(element => {
                  const data = {
                    name : element,
                    label_id : element
                  }
                  this.spendData.push(data);
                });
                this.label.label_data = JSON.stringify(this.spendData);
                this.label.label_type = 'SpendType';
                this.labelService()
                  .create(this.label)
                  .then(res3 => {
                    console.log('Added successfully');
                  });
              });
          });
      }).catch(err => { console.error(err) });
  }
}
