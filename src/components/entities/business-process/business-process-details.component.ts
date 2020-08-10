import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBusinessProcess } from '../../shared/model/business-process.model';
import BusinessProcessService from './business-process.service';

@Component
export default class BusinessProcessDetails extends Vue {
  @Inject('businessProcessService') private businessProcessService!: () => BusinessProcessService;
  public businessProcess: IBusinessProcess = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.businessProcessId) {
        vm.retrieveBusinessProcess(to.params.businessProcessId);
      }
    });
  }

  public retrieveBusinessProcess(businessProcessId: number) {
    this.businessProcessService()
      .find(businessProcessId)
      .then(res => {
        this.businessProcess = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
