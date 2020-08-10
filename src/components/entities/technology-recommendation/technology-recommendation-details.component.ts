import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import TechnologyRecommendationService from './technology-recommendation.service';

@Component
export default class TechnologyRecommendationDetails extends Vue {
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  public technologyRecommendation: ITechnologyRecommendation = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyRecommendationId) {
        vm.retrieveTechnologyRecommendation(to.params.technologyRecommendationId);
      }
    });
  }

  public retrieveTechnologyRecommendation(technologyRecommendationId: number) {
    this.technologyRecommendationService()
      .find(technologyRecommendationId)
      .then(res => {
        this.technologyRecommendation = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
