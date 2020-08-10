import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { ITechnologyRecommendation, TechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import TechnologyRecommendationService from './technology-recommendation.service';
import LabelService from '../label/label.service';
import { bus } from '../../../main';
import { ILabel } from '../../shared/model/label.model';

const validations: any = {
  technologyRecommendation: {
    technologyName: {
      required
    },
    outdatedVersion: {
      numberValidation(outdatedVersion: string) {
        return /^(\d{0,3}[0-9])?(.\d{0,3}?)(.\d{0,2})?$/.test(outdatedVersion);
      }
    },
    stableVersion: {
      required,
      numberValidation(stableVersion: string) {
        return /^(\d{0,3}[0-9])?(.\d{0,3}?)(.\d{0,2})?$/.test(stableVersion);
      }
    },
    latestVersion: {
      numberValidation(latestVersion: string) {
        return /^(\d{0,3}[0-9])?(.\d{0,3}?)(.\d{0,2})?$/.test(latestVersion);
      }
    },
    newFeatures: {},
    technologyType: {}
  }
};

@Component({
  validations
})
export default class TechnologyRecommendationUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('labelService') private labelService!: () => LabelService;
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  public technologyRecommendation: ITechnologyRecommendation = new TechnologyRecommendation();
  public isSaving = false;
  public companyId: number = 0;
  public labels: ILabel[] = [];
  public label: ILabel = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyRecommendationId) {
        vm.retrieveTechnologyRecommendation(to.params.technologyRecommendationId);
      }
    });
  }
  public created() {
    bus.$on('CompanyChange', (obj: any) => {
      this.companyId = obj;
      console.log(this.companyId);
      this.retrieveAllLabelData();
    });
    if (this.companyId === 0) {
      this.companyId = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllLabelData();
    }
  }
  public save(): void {
    this.isSaving = true;
    if (this.technologyRecommendation.id) {
      this.technologyRecommendationService()
        .update(this.technologyRecommendation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TechnologyRecommendation is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.technologyRecommendationService()
        .create(this.technologyRecommendation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TechnologyRecommendation is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveTechnologyRecommendation(technologyRecommendationId: number): void {
    this.technologyRecommendationService()
      .find(technologyRecommendationId)
      .then(res => {
        this.technologyRecommendation = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  public retrieveAllLabelData() {
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
        this.labels.forEach(element => {
          if (element.company?.id === this.companyId && element.label_type === 'TechnologyBucket') {
            this.label = element;
          }
        });
        this.label.label_data = JSON.parse(this.label.label_data);
      }).catch(err => { console.error(err) });
  }
}
