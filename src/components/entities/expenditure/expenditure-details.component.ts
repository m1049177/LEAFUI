import { Component, Vue, Inject } from 'vue-property-decorator';

import { IExpenditure } from '../../shared/model/expenditure.model';
import ExpenditureService from './expenditure.service';

@Component
export default class ExpenditureDetails extends Vue {
  @Inject('expenditureService') private expenditureService!: () => ExpenditureService;
  public expenditure: IExpenditure = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.expenditureId) {
        vm.retrieveExpenditure(to.params.expenditureId);
      }
    });
  }

  public retrieveExpenditure(expenditureId: number) {
    this.expenditureService()
      .find(expenditureId)
      .then(res => {
        this.expenditure = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
