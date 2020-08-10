import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import OraganizationalUnitService from '../oraganizational-unit/oraganizational-unit.service';
import { IOraganizationalUnit } from '../../shared/model/oraganizational-unit.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '../../shared/model/employee.model';

import AlertService from '../../shared/alert/alert.service';
import { ILineOfBusiness, LineOfBusiness } from '../../shared/model/line-of-business.model';
import LineOfBusinessService from './line-of-business.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  lineOfBusiness: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class LineOfBusinessUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('oraganizationalUnitService') private oraganizationalUnitService!: () => OraganizationalUnitService;
  @Inject('employeeService') private employeeService!: () => EmployeeService;
  @Inject('filterService') private filterService!: () => FilterService;

  public oraganizationalUnits: IOraganizationalUnit[] = [];
  public lineOfBusiness: ILineOfBusiness = new LineOfBusiness();
  public employees: IEmployee[] = [];
  public isSaving = false;
  public company_id: number = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.lineOfBusinessId) {
        vm.retrieveLineOfBusiness(to.params.lineOfBusinessId);
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
    if (this.lineOfBusiness.id) {
      this.lineOfBusinessService()
        .update(this.lineOfBusiness)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A LineOfBusiness is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.lineOfBusinessService()
        .create(this.lineOfBusiness)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A LineOfBusiness is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveLineOfBusiness(lineOfBusinessId: number): void {
    this.lineOfBusinessService()
      .find(lineOfBusinessId)
      .then(res => {
        this.lineOfBusiness = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.oraganizationalUnitService()
      .retrieve()
      .then(res => {
        this.oraganizationalUnits = res.data;
        this.filterService()
          .OrganizationalFilter(this.oraganizationalUnits, this.company_id)
          .then(res1 => {
            this.oraganizationalUnits = res1;
          });
      }).catch(err => { console.error(err) });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      }).catch(err => { console.error(err) });
  }
}
