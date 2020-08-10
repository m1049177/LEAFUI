import { Component, Inject, Vue } from 'vue-property-decorator';
import { IEmployee } from '../../shared/model/employee.model';
import AlertService from '../../shared/alert/alert.service';

import EmployeeService from './employee.service';

@Component
export default class Employee extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('employeeService') private employeeService!: () => EmployeeService;
  private removeId: number = 0;
  public employees: IEmployee[] = [];
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllEmployees();
  }

  public clear(): void {
    this.retrieveAllEmployees();
  }

  public retrieveAllEmployees(): void {
    this.isFetching = true;

    this.employeeService()
      .retrieve()
      .then(
        res => {
          this.employees = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IEmployee): void {
    this.removeId = instance.id!;
  }

  public removeEmployee(): void {
    this.employeeService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Employee is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllEmployees();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
