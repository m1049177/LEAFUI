import { Component, Vue, Inject } from 'vue-property-decorator';

import { ISpend } from '../../shared/model/spend.model';
import SpendService from './spend.service';

@Component
export default class SpendDetails extends Vue {
  @Inject('spendService') private spendService!: () => SpendService;
  public spend: ISpend = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.spendId) {
        vm.retrieveSpend(to.params.spendId);
      }
    });
  }

  public retrieveSpend(spendId: number) {
    this.spendService()
      .find(spendId)
      .then(res => {
        this.spend = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
