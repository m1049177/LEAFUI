import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITechnologyStack } from '../../shared/model/technology-stack.model';
import TechnologyStackService from './technology-stack.service';

@Component
export default class TechnologyStackDetails extends Vue {
  @Inject('technologyStackService') private technologyStackService!: () => TechnologyStackService;
  public technologyStack: ITechnologyStack = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyStackId) {
        vm.retrieveTechnologyStack(to.params.technologyStackId);
      }
    });
  }

  public retrieveTechnologyStack(technologyStackId: number) {
    this.technologyStackService()
      .find(technologyStackId)
      .then(res => {
        this.technologyStack = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
