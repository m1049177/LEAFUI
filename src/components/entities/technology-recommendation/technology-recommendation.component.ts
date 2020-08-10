import { Component, Inject, Vue } from 'vue-property-decorator';
import { ITechnologyRecommendation } from '../../shared/model/technology-recommendation.model';
import AlertService from '../../shared/alert/alert.service';

import TechnologyRecommendationService from './technology-recommendation.service';

@Component
export default class TechnologyRecommendation extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologyRecommendationService') private technologyRecommendationService!: () => TechnologyRecommendationService;
  private removeId: number = 0;
  public technologyRecommendations: ITechnologyRecommendation[] = [];
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllTechnologyRecommendations();
  }

  public clear(): void {
    this.retrieveAllTechnologyRecommendations();
  }

  public retrieveAllTechnologyRecommendations(): void {
    this.isFetching = true;

    this.technologyRecommendationService()
      .retrieve()
      .then(
        res => {
          this.technologyRecommendations = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ITechnologyRecommendation): void {
    this.removeId = instance.id!;
  }

  public removeTechnologyRecommendation(): void {
    this.technologyRecommendationService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TechnologyRecommendation is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllTechnologyRecommendations();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
