import { Component, Inject, Vue } from 'vue-property-decorator';
import TechnologyService from '../../entities/technology/technology.service';
import TechnologyRecommendationService from '../../entities/technology-recommendation/technology-recommendation.service';
import TechnologySuggestionsService from '../../entities/technology-suggestions/technology-suggestions.service';
import { IApplication } from '../../shared/model/application.model';
import { ITechnology } from '../../shared/model/technology.model';
import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import ApplicationService from '../../entities/application/application.service';
import LineOfBusinessService from '../../entities/line-of-business/line-of-business.service';
import { ILobSearchData } from '../../shared/model/lobSearchData.model';
import { IBusinessFunction } from '@/components/shared/model/business-function.model';
import { ICapabilities } from '@/components/shared/model/capabilities.model';
import { IBusinessProcess } from '@/components/shared/model/business-process.model';

@Component
export default class SearchDetail extends Vue {
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  @Inject('technologySuggestionsService') private technologySuggestionsService!: () => TechnologySuggestionsService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;

  public type = '';
  public id = '';
  public applications: IApplication[] = [];
  public technology: ITechnology = {};
  public technologyRecommendation: ITechnologyRecommendation[] = [];
  public technologySuggestions: ITechnologySuggestions[] = [];
  public techSuggestion: ITechnologySuggestions[] = [];
  public lobData: ILobSearchData = {};

  public created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
  }

  public mounted() {
    this.technology = {};
    if (this.type === 'lob') {
      this.lineOfBusinessService()
        .searchData(parseInt(this.id))
        .then(lob => {
          console.log(lob.data);
          this.lobData = lob.data;
          this.lobData.bFunction = this.lobData.bFunction!.filter((bf: IBusinessFunction) => bf.lineOfBusiness?.id === this.lobData.id);
          this.lobData.capability = this.lobData.capability!.filter((cap: ICapabilities) => cap.businessFunction?.lineOfBusiness?.id === this.lobData.id);
          this.lobData.bProcesses = this.lobData.bProcesses!.filter(
            (process: IBusinessProcess) => process.capabilities?.businessFunction?.lineOfBusiness?.id === this.lobData.id
          );
          this.lobData.activities = this.lobData.activities!.filter(
            act => act.businessProcess?.capabilities?.businessFunction?.lineOfBusiness?.id === this.lobData.id
          );
          this.lobData.tasks = this.lobData.tasks!.filter(
            task => task.activity?.businessProcess?.capabilities?.businessFunction?.lineOfBusiness?.id === this.lobData.id
          );
        });
      this.applicationService()
        .retrieve()
        .then((res1: any) => {
          this.applications = res1.data;
          this.applications = this.applications.filter(element => element.lineOfBusiness?.id === parseInt(this.id));
        });
    } else {
      this.technologyService()
        .find(parseInt(this.id))
        .then((res: any) => {
          this.techSuggestion = [];
          this.technologyRecommendation = [];
          this.technologySuggestions = [];
          this.technology = res;
          this.technologyRecommendationService()
            .retrieve()
            .then((response: any) => {
              this.technologyRecommendation = response.data;
              this.technologyRecommendation = this.technologyRecommendation.filter(
                element =>
                  element.technologyType === this.technology.technologyStack?.type &&
                  element.technologyName === this.technology.technologyStack?.name!.split('-')[0]
              );
              this.technologySuggestionsService()
                .retrieve()
                .then((result: any) => {
                  this.technologySuggestions = result.data;
                  this.technologyRecommendation.forEach(recommendation => {
                    this.technologySuggestions.forEach(suggestion => {
                      if (recommendation.id === suggestion.technologyRecommendation?.id) {
                        this.techSuggestion.push(suggestion);
                      }
                    });
                  });
                });
            });
        });
    }
  }

  public back() {
    this.$router.go(-2);
  }
}
