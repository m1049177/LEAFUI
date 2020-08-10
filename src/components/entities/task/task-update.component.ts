import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ActivityService from '../activity/activity.service';
import { IActivity } from '../../shared/model/activity.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '../../shared/model/employee.model';

import AlertService from '../../shared/alert/alert.service';
import { ITask, Task } from '../../shared/model/task.model';
import TaskService from './task.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  task: {
    name: {
      required
    },
    estimatedCost: {
      required,
      numeric
    }
  }
};

@Component({
  validations
})
export default class TaskUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('taskService') private taskService!: () => TaskService;
  @Inject('filterService') private filterService!: () => FilterService;
  @Inject('activityService') private activityService!: () => ActivityService;
  @Inject('employeeService') private employeeService!: () => EmployeeService;

  public activities: IActivity[] = [];
  public company_id: number = 0;
  public task: ITask = new Task();
  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.taskId) {
        vm.retrieveTask(to.params.taskId);
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
    if (this.task.id) {
      this.taskService()
        .update(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Task is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.taskService()
        .create(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Task is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveTask(taskId: number): void {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.activityService()
      .retrieve()
      .then(res => {
        this.activities = res.data;
        if (this.activities.length!== 0) {
          this.filterService()
            .ActivityFilter(this.activities, this.company_id)
            .then(res1 => {
              this.activities = res1;
              console.log(this.activities);
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
