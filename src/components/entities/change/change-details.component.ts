import { Component, Vue, Inject } from 'vue-property-decorator';

import { IChange } from '../../shared/model/change.model';
import ChangeService from './change.service';

@Component
export default class ChangeDetails extends Vue {
  @Inject('changeService') private changeService!: () => ChangeService;
  public change: IChange = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.changeId) {
        vm.retrieveChange(to.params.changeId);
      }
    });
  }

  public retrieveChange(changeId: number) {
    this.changeService()
      .find(changeId)
      .then(res => {
        this.change = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
