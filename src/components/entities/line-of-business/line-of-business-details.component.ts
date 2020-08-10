import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILineOfBusiness } from '../../shared/model/line-of-business.model';
import LineOfBusinessService from './line-of-business.service';

@Component
export default class LineOfBusinessDetails extends Vue {
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  public lineOfBusiness: ILineOfBusiness = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.lineOfBusinessId) {
        vm.retrieveLineOfBusiness(to.params.lineOfBusinessId);
      }
    });
  }

  public retrieveLineOfBusiness(lineOfBusinessId: number) {
    this.lineOfBusinessService()
      .find(lineOfBusinessId)
      .then(res => {
        this.lineOfBusiness = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
