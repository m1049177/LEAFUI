import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import TechnologyRecommendationService from '../technology-recommendation/technology-recommendation.service';
import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';

import AlertService from '../../shared/alert/alert.service';
import { ITechnologySuggestions, TechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import TechnologySuggestionsService from './technology-suggestions.service';

const validations: any = {
  technologySuggestions: {
    type: {},
    version: {},
    description: {},
    suggestion: {}
  }
};

@Component({
  validations
})
export default class TechnologySuggestionsUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologySuggestionsService') private technologySuggestionsService!: () => TechnologySuggestionsService;
  public technologySuggestions: ITechnologySuggestions = new TechnologySuggestions();

  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;

  public technologyRecommendations: ITechnologyRecommendation[] = [];
  public isSaving = false;
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologySuggestionsId) {
        vm.retrieveTechnologySuggestions(to.params.technologySuggestionsId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.technologySuggestions.id) {
      this.technologySuggestionsService()
        .update(this.technologySuggestions)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TechnologySuggestions is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.technologySuggestionsService()
        .create(this.technologySuggestions)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TechnologySuggestions is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveTechnologySuggestions(technologySuggestionsId: number): void {
    this.technologySuggestionsService()
      .find(technologySuggestionsId)
      .then(res => {
        this.technologySuggestions = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.technologyRecommendationService()
      .retrieve()
      .then(res => {
        this.technologyRecommendations = res.data;
      }).catch(err => { console.error(err) });
  }
}
