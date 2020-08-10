import { Component, Inject, Vue } from 'vue-property-decorator';
import { ITechnologySuggestions } from '../../shared/model/technology-suggestions.model';
import AlertService from '../../shared/alert/alert.service';

import TechnologySuggestionsService from './technology-suggestions.service';

@Component
export default class TechnologySuggestions extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologySuggestionsService') private technologySuggestionsService!: () => TechnologySuggestionsService;
  private removeId: number = 0;
  public technologySuggestions: ITechnologySuggestions[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;
  $refs!: {
    removeEntity: HTMLFormElement
  }
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
    this.retrieveAllTechnologySuggestionss();
  }

  public clear(): void {
    this.retrieveAllTechnologySuggestionss();
  }

  public retrieveAllTechnologySuggestionss(): void {
    this.isFetching = true;

    this.technologySuggestionsService()
      .retrieve()
      .then(
        res => {
          this.technologySuggestions = res.data;
          console.log(this.technologySuggestions);
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITechnologySuggestions): void {
    this.removeId = instance.id!;
  }

  public removeTechnologySuggestions(): void {
    this.technologySuggestionsService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A TechnologySuggestions is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllTechnologySuggestionss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
