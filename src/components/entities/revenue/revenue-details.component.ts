import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRevenue } from '../../shared/model/revenue.model';
import RevenueService from './revenue.service';

@Component
export default class RevenueDetails extends Vue {
  @Inject('revenueService') private revenueService!: () => RevenueService;
  public revenue: IRevenue = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.revenueId) {
        vm.retrieveRevenue(to.params.revenueId);
      }
    });
  }

  public retrieveRevenue(revenueId: number) {
    this.revenueService()
      .find(revenueId)
      .then(res => {
        this.revenue = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
