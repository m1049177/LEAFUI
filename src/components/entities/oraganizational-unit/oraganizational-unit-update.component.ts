import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '../../shared/model/employee.model';

import CompanyService from '../company/company.service';
import { ICompany } from '../../shared/model/company.model';

import AlertService from '../../shared/alert/alert.service';
import { IOraganizationalUnit, OraganizationalUnit } from '../../shared/model/oraganizational-unit.model';
import OraganizationalUnitService from './oraganizational-unit.service';
import { bus } from '../../../main';

const validations: any = {
  oraganizationalUnit: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class OraganizationalUnitUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('oraganizationalUnitService') private oraganizationalUnitService!: () => OraganizationalUnitService;
  public oraganizationalUnit: IOraganizationalUnit = new OraganizationalUnit();

  @Inject('employeeService') private employeeService!: () => EmployeeService;

  public employees: IEmployee[] = [];

  @Inject('companyService') private companyService!: () => CompanyService;

  public companies: ICompany = {};
  public isSaving = false;
  public company_id: number = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.oraganizationalUnitId) {
        vm.retrieveOraganizationalUnit(to.params.oraganizationalUnitId);
      }
    });
  }
  public created() {
    bus.$on('CompanyChange', (obj: any) => {
      console.log(obj);
      this.company_id = obj;
      this.initRelationships();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.initRelationships();
    }
    console.log(this.company_id);
  }
  public save(): void {
    this.isSaving = true;
    this.oraganizationalUnit.company = this.companies;
    if (this.oraganizationalUnit.id) {
      this.oraganizationalUnitService()
        .update(this.oraganizationalUnit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A OraganizationalUnit is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.oraganizationalUnitService()
        .create(this.oraganizationalUnit)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A OraganizationalUnit is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveOraganizationalUnit(oraganizationalUnitId: number): void {
    this.oraganizationalUnitService()
      .find(oraganizationalUnitId)
      .then(res => {
        this.oraganizationalUnit = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      }).catch(err => { console.error(err) });
    this.companyService()
      .find(this.company_id)
      .then(res => {
        this.companies = res;
        console.log(this.companies);
      }).catch(err => { console.error(err) });
  }
}
