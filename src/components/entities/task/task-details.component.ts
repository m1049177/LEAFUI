import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITask } from '../../shared/model/task.model';
import TaskService from './task.service';

@Component
export default class TaskDetails extends Vue {
  @Inject('taskService') private taskService!: () => TaskService;
  public task: ITask = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.taskId) {
        vm.retrieveTask(to.params.taskId);
      }
    });
  }

  public retrieveTask(taskId: number) {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
