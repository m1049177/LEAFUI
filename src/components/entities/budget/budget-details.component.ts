import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBudget } from '../../shared/model/budget.model';
import BudgetService from './budget.service';

@Component
export default class BudgetDetails extends Vue {
  @Inject('budgetService') private budgetService!: () => BudgetService;
  public budget: IBudget = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.budgetId) {
        vm.retrieveBudget(to.params.budgetId);
      }
    });
  }

  public retrieveBudget(budgetId: number) {
    this.budgetService()
      .find(budgetId)
      .then(res => {
        this.budget = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
