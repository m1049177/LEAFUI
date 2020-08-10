import { Component, Inject, Vue } from 'vue-property-decorator';
import TechnologySuggestionsService from '../../entities/technology-suggestions/technology-suggestions.service';
import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import { ITechnology } from '../../shared/model/technology.model';
import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import TechnologyRecommendationService from '../../entities/technology-recommendation/technology-recommendation.service';
import TechnologyService from '../../entities/technology/technology.service';
import { ISuggestionView } from '../../shared/model/suggestionView.model';
import { IApplication, Application } from '../../shared/model/application.model';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Suggestion extends Vue {
  @Inject('technologySuggestionsService') private TechnologySuggestionsService!: () => TechnologySuggestionsService;
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public technologies: ITechnology[] = [];
  public technologyRecommendation: ITechnologyRecommendation[] = [];
  public technologySuggestions: ITechnologySuggestions[] = [];
  public suggestionData: any[] = [];
  public technologyData: any[] = [];
  public technologySuggestion: any[] = [];
  public suggestion: string[] = [];
  public description: string[] = [];
  public application: IApplication[] = [];
  public bucket = ' ';
  public type = ' ';

  public created() {
    this.bucket = this.$route.params.bucket;
    this.type = this.$route.params.type;
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllRiskApplication();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllRiskApplication();
    }
  }

  public mounted() {
    // this.retrieveAllRiskApplication();
  }

  public retrieveAllRiskApplication() {
    this.technologies = [];
    this.technologyRecommendation = [];
    this.technologyData = [];
    this.suggestionData = [];
    this.technologyService()
      .retrieve()
      .then(res => {
        this.technologies = res.data;
        if (this.technologies.length!== 0) {
          this.filterService()
            .TechnologyFilter(this.technologies, this.company_id)
            .then(res1 => {
              this.technologies = res1;
            });
        }
        this.technologies = this.technologies.filter(element => element.technologyStack?.type === this.bucket);
        this.technologyRecommendationService()
          .retrieve()
          .then(response => {
            this.technologyRecommendation = response.data;
            this.technologyRecommendation = this.technologyRecommendation.filter(element => element.technologyType === this.bucket);

            // Logic for finding the risk version of technology
            this.technologyRecommendation.forEach(item => {
              this.technologies.forEach(technology => {
                if (
                  this.type === 'RISK' &&
                  technology.technologyStack?.name!.split('-')[0] === item.technologyName &&
                  technology.technologyStack?.name!.split('-')[1] < item.stableVersion!
                ) {
                  this.suggestionData.push({
                    application: technology.application,
                    recommendation: item.id,
                    technology: technology.technologyStack
                  });
                } else if (this.type !== 'RISK' && technology.technologyStack?.name!.split('-')[0] === item.technologyName) {
                  this.suggestionData.push({
                    application: technology.application,
                    recommendation: item.id,
                    technology: technology.technologyStack
                  });
                }
              });
            });
            console.log(this.suggestionData);
            for (let i = 0; i < this.suggestionData.length; i++) {
              if (this.suggestionData[i].technology.id !== 0) {
                let j = i + 1;
                this.application.push(this.suggestionData[i].application);
                while (j > i && j < this.suggestionData.length) {
                  if (this.suggestionData[i].technology.id === this.suggestionData[j].technology.id) {
                    this.application.push(this.suggestionData[j].application);
                    this.suggestionData[j].technology.id = 0;
                  }
                  j = j + 1;
                }
                this.technologyData.push({
                  application: this.application,
                  technology: this.suggestionData[i].technology,
                  recommendation: this.suggestionData[i].recommendation
                });
                this.application = [];
              }
            }
            console.log(this.technologyData);
          });
        this.retrieveAllTechnologySuggestions();
      }).catch(function(error) { console.log(error); })
  }
  public retrieveAllTechnologySuggestions() {
    this.technologySuggestions = [];
    this.TechnologySuggestionsService()
      .retrieve()
      .then(res => {
        this.technologySuggestions = res.data;
        if (this.type === 'RISK') {
          this.technologySuggestions = this.technologySuggestions.filter(
            element => element.type === this.type && element.technologyRecommendation?.technologyType === this.bucket
          );
        } else {
          this.technologySuggestions = this.technologySuggestions.filter(
            element => element.type !== 'RISK' && element.technologyRecommendation?.technologyType === this.bucket
          );
        }
        this.technologyData.forEach(item => {
          this.technologySuggestions.forEach(element => {
            if (item.technology?.name! === element.technologyRecommendation?.technologyName + '-' + element.version && this.suggestionData) {
              this.suggestion.push(element.suggestion!);
              this.description.push(element.description!);
            }
          });
          if (this.suggestion.length !== 0 && this.description.length !== 0) {
            this.technologySuggestion.push({
              application: item.application,
              suggestion: this.suggestion,
              description: this.description,
              technology: item.technology
            });
            this.suggestion = [];
            this.description = [];
            this.application = [];
          }
        });
        // console.log(this.technologySuggestion);
        // Logic for aggregating the application based on technology
        const count = this.technologySuggestion.length - 1;
        for (let i = 0; i < count; i++) {
          let j = i + 1;
          while (j > 0 && j < count - 1) {
            if (this.technologySuggestion[i].technology?.id === this.technologySuggestion[j].technology?.id) {
              this.technologySuggestion[i].application?.push(this.technologySuggestion[j].application[0]!);
              this.technologySuggestion.splice(j, 1);
            }
            j = j + 1;
          }
        }
        // console.log(this.technologySuggestion);
      }).catch(function(error) { console.log(error); })
  }
}
