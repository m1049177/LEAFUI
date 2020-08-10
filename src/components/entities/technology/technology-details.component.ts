import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITechnology } from '../../shared/model/technology.model';
import TechnologyService from './technology.service';

@Component
export default class TechnologyDetails extends Vue {
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  public technology: ITechnology = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyId) {
        vm.retrieveTechnology(to.params.technologyId);
      }
    });
  }

  public retrieveTechnology(technologyId: number) {
    this.technologyService()
      .find(technologyId)
      .then(res => {
        this.technology = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
