import { Component, Inject, Vue } from 'vue-property-decorator';
import TechnologyService from '../../entities/technology/technology.service';
import { ISuggestion } from '../../shared/model/suggestion.model';
import TechnologySuggestionsService from '../../entities/technology-suggestions/technology-suggestions.service';
import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import VueApexCharts from 'vue-apexcharts';
import { ITechnologyAppCount } from '../../shared/model/technologyAppCount.model';
import TechnologyRecommendationService from '../../entities/technology-recommendation/technology-recommendation.service';
import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import LabelService from '../../entities/label/label.service';
import { ILabel } from '../../shared/model/label.model';
import { bus } from '../../../main';

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class TechnicalView extends Vue {
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  @Inject('technologySuggestionsService') private technologySuggestionsService!: () => TechnologySuggestionsService;
  @Inject('labelService') private labelService!: () => LabelService;

  public technologySuggestions: ITechnologySuggestions[] = [];
  public technologyAppCount: ITechnologyAppCount[] = [];
  public technologyData: ITechnologyAppCount[] = [];
  public technologyRecommendation: ITechnologyRecommendation[] = [];
  public suggestion: ISuggestion[] = [];
  public data: ITechnologyAppCount[] = [];
  public totalCount: number[] = [];
  public technologyType: string[] = [];
  public totalAppCount = 0;
  public labels: ILabel[] = [];
  public label: ILabel = {};
  chartOptions: any = {};
  chartSeries: any = [];
  fields: any = [];
  perPage = 5;
  currentPage = 1;
  public modalBucket = '';
  public riskApplication = 0;
  public stableApplication = 0;
  public selectedBucket = 'CLIENT';
  public companyId: number = 0;
  public busStatus = false;

  public mounted(): void {}

  public created() {
    this.busStatus = false;
    bus.$on('CompanyChange', (obj: any) => {
      console.log(obj, this.companyId);
      if(parseInt(obj)!== this.companyId) {
        this.busStatus = true;
        this.companyId = parseInt(obj);
      this.retrieveLabelData().then(response => {
        this.retrieveAppCount().then(res => {
          this.navigateFunction(this.selectedBucket);
        }).catch(function(error) { console.log(error); })
      }).catch(function(error) { console.log(error); })
    }
    });

    if (this.companyId === 0 && this.busStatus === false) {
      this.companyId = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveLabelData().then(response => {
        this.retrieveAppCount().then(res => {
          this.navigateFunction(this.selectedBucket);
        }).catch(function(error) { console.log(error); })
      }).catch(function(error) { console.log(error); })
    }
  }

  chartFunction() {
    this.chartOptions = {
      chart: {
        stacked: true,
        events: {
          dataPointSelection: function(event: any, chartContext: any, config: any) {
            console.log(chartContext, config);
          }
        }
      },

      plotOptions: {
        bar: {
          vertical: true
        }
      },
      colors: ['#e34046', '#04d18a', '#5884a6'],
      stroke: {
        width: 1,
        colors: ['#fff']
      },

      xaxis: {
        categories: this.technologyType,
        labels: {
          events: {
            click: function() {
             // alert(this.xAxis[0].tickPositions.length);
            }
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      tooltip: {
        show: false
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    };
    this.fields = ['name', 'count'];
  }
  public labelEdit(label: string) {
    // console.log('edit function' + label);
    document.getElementById(label)!.focus();
  }

  public labelChange() {
    // console.log(this.label.label_data);
    this.label.label_data = JSON.stringify(this.label.label_data);
    this.labelService()
      .update(this.label)
      .then(res => {
        console.log('updated successfully', res.id);
        this.retrieveLabelData();
      }).catch(function(error) { console.log(error); })
  }

  public retrieveAppCount() {
    return new Promise(resolve => {
      this.technologyAppCount = [];
      this.technologySuggestions = [];
      this.technologyService()
        .technologyCount(this.companyId)
        .then(
          res => {
            this.technologyAppCount = res;
            this.totalCount = [];
            this.technologyType.forEach(bucketType => {
              let cout = 0;
              this.technologyAppCount.forEach(bucketCount => {
                if (bucketCount.type === bucketType) {
                  cout = cout + 1;
                }
              });
              this.totalCount.push(cout);
            });
            // console.log(this.totalCount);
            this.totalAppCount = this.technologyAppCount.reduce((total, value) => total + value.count!, 0);
            this.technologySuggestionsService()
              .retrieve()
              .then(result => {
                this.technologySuggestions = result.data;
                this.suggestion = [];
                this.technologyType.forEach(type => {
                  let riskCount = 0;
                  let stableCount = 0;
                  this.data = this.technologyAppCount.filter(value => value.type === type);
                  this.data.forEach(element => {
                    this.technologySuggestions.forEach(technology => {
                      if (
                        element.name === technology.technologyRecommendation?.technologyName + '-' + technology.version &&
                        technology.type === 'RISK' &&
                        element.type === type
                      ) {
                        riskCount = riskCount + 1;
                      } else if (
                        element.name === technology.technologyRecommendation?.technologyName + '-' + technology.version &&
                        technology.type !== 'RISK' &&
                        element.type === type
                      ) {
                        stableCount = stableCount + 1;
                      }
                    });
                  });
                  this.suggestion.push({ risk: riskCount, stable: stableCount, type: type });
                  this.riskApplication = this.suggestion.reduce((total, value) => total + value.risk!, 0);
                  this.stableApplication = this.suggestion.reduce((total, value) => total + value.stable!, 0);
                });

                const risk = [];
                const stable = [];
                const others = [];
                for (let i = 0; i < this.totalCount.length; i++) {
                  risk.push(this.suggestion[i].risk);
                  stable.push(this.suggestion[i].stable);
                  others.push(this.totalCount[i] - this.suggestion[i].risk! + this.suggestion[i].stable!);
                }
                this.chartSeries = [
                  {
                    name: 'Risk Application Count',
                    data: risk
                  },
                  {
                    name: 'Stable Application Count',
                    data: stable
                  },
                  {
                    name: 'Others',
                    data: others
                  }
                ];
                this.chartFunction();
              });
          },
          error => {
            console.log(error);
          }
        ).catch(function(error) { console.log(error); })
      resolve(this.technologyAppCount);
    });
  }

  public hideModal() {
    this.$root.$emit('bv::hide::modal', 'upgradation');
    this.modalBucket = '';
  }

  public showModal() {
    this.technologyRecommendation = [];
    this.technologyRecommendationService()
      .retrieve()
      .then(res => {
        this.technologyRecommendation = res.data;
        this.technologyRecommendation = this.technologyRecommendation.filter(element => element.technologyType === this.modalBucket);
      }).catch(function(error) { console.log(error); })
    this.$root.$emit('bv::show::modal', 'upgradation');
  }

  public Suggestion(bucket: string, type: string) {
    this.$router.push({ name: 'Suggestion', params: { bucket, type } });
  }

  public navigateFunction(type: string) {
    this.selectedBucket = type;
    this.technologyService()
      .technologyCount(this.companyId)
      .then(res => {
        this.technologyData = res;
        // console.log(this.technologyData);
        this.technologyData = this.technologyData.filter(data => data.type === this.selectedBucket);
      }).catch(function(error) { console.log(error); })
  }
  public retrieveLabelData() {
    return new Promise(resolve => {
      this.labels = [];
      this.label = {};
      this.labelService()
        .retrieve()
        .then(res => {
          this.labels = res.data;
          this.labels.forEach(element => {
            if (element.label_type === 'TechnologyBucket' && element.company?.id === this.companyId) {
              this.label = element;
              this.label.label_data = JSON.parse(this.label.label_data);
            }
          });
          this.technologyType = [];
          // console.log(this.label.label_data);
          this.label.label_data.forEach((data: any) => {
            this.technologyType.push(data.name);
          });
          // console.log(this.technologyType);
        }).catch(function(error) { console.log(error); })
      resolve(this.technologyType);
    });
  }
}
