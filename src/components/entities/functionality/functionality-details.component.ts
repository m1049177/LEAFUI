import { Component, Vue, Inject } from 'vue-property-decorator';

import { IFunctionality } from '../../shared/model/functionality.model';
import FunctionalityService from './functionality.service';

@Component
export default class FunctionalityDetails extends Vue {
  @Inject('functionalityService') private functionalityService!: () => FunctionalityService;
  public functionality: IFunctionality = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.functionalityId) {
        vm.retrieveFunctionality(to.params.functionalityId);
      }
    });
  }

  public retrieveFunctionality(functionalityId: number) {
    this.functionalityService()
      .find(functionalityId)
      .then(res => {
        this.functionality = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
