import { Component, Inject, Vue } from 'vue-property-decorator';
import { ITask } from '../../shared/model/task.model';
import AlertService from '../../shared/alert/alert.service';

import TaskService from './task.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Task extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('taskService') private taskService!: () => TaskService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public tasks: ITask[] = [];
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

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllTasks();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllTasks();
    }
  }
  public mounted(): void {
    // this.retrieveAllTasks();
  }

  public clear(): void {
    this.retrieveAllTasks();
  }

  public retrieveAllTasks(): void {
    this.isFetching = true;

    this.taskService()
      .retrieve()
      .then(
        res => {
          this.tasks = res.data;
          if (this.tasks.length!== 0) {
            this.filterService()
              .TaskFilter(this.tasks, this.company_id)
              .then(res1 => {
                this.tasks = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ITask): void {
    this.removeId = instance.id!;
  }

  public removeTask(): void {
    this.taskService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Task is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllTasks();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
