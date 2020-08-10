import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { IEmployee, Employee } from '../../shared/model/employee.model';
import EmployeeService from './employee.service';

const validations: any = {
  employee: {
    employeeId: {
      required
    },
    name: {
      required
    },
    dateOfJoining: {
      required
    },
    gender: {
      required
    },
    address: {
      required
    },
    designation: {
      required
    }
  }
};

@Component({
  validations
})
export default class EmployeeUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('employeeService') private employeeService!: () => EmployeeService;
  public employee: IEmployee = new Employee();
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Employee is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Employee is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveEmployee(employeeId: number): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
