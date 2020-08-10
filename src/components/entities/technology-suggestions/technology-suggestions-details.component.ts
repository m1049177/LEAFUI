import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import TechnologySuggestionsService from './technology-suggestions.service';

@Component
export default class TechnologySuggestionsDetails extends Vue {
  @Inject('technologySuggestionsService') private technologySuggestionsService!: () => TechnologySuggestionsService;
  public technologySuggestions: ITechnologySuggestions = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologySuggestionsId) {
        vm.retrieveTechnologySuggestions(to.params.technologySuggestionsId);
      }
    });
  }

  public retrieveTechnologySuggestions(technologySuggestionsId: number) {
    this.technologySuggestionsService()
      .find(technologySuggestionsId)
      .then(res => {
        this.technologySuggestions = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
