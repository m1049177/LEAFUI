import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import LineOfBusinessService from '../line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '../../shared/model/employee.model';

import AlertService from '../../shared/alert/alert.service';
import { IBusinessFunction, BusinessFunction } from '../../shared/model/business-function.model';
import BusinessFunctionService from './business-function.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  businessFunction: {
    type: {
      required
    },
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class BusinessFunctionUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('businessFunctionService') private businessFunctionService!: () => BusinessFunctionService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('employeeService') private employeeService!: () => EmployeeService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public employees: IEmployee[] = [];
  public businessFunction: IBusinessFunction = new BusinessFunction();
  public isSaving = false;
  public lineOfBusinesses: ILineOfBusiness[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.businessFunctionId) {
        vm.retrieveBusinessFunction(to.params.businessFunctionId);
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
    if (this.businessFunction.id) {
      this.businessFunctionService()
        .update(this.businessFunction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BusinessFunction is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.businessFunctionService()
        .create(this.businessFunction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BusinessFunction is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveBusinessFunction(businessFunctionId: number): void {
    this.businessFunctionService()
      .find(businessFunctionId)
      .then(res => {
        this.businessFunction = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.lineOfBusinessService()
      .retrieve()
      .then(res => {
        this.lineOfBusinesses = res.data;
        if (this.lineOfBusinesses.length!== 0) {
          this.filterService()
            .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
            .then(res1 => {
              this.lineOfBusinesses = res1;
            });
        }
      }).catch(err => { console.error(err) });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      }).catch(err => { console.error(err) });
  }
}
