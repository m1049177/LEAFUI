import { Component, Inject, Vue } from 'vue-property-decorator';
import { IFunctionality } from '../../shared/model/functionality.model';
import AlertService from '../../shared/alert/alert.service';

import FunctionalityService from './functionality.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Functionality extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('functionalityService') private functionalityService!: () => FunctionalityService;
  @Inject('filterService') private filterService!: () => FilterService;

  $refs!: {
    removeEntity: HTMLFormElement
  }
  public company_id: number = 0;
  private removeId: number = 0;
  public functionalities: IFunctionality[] = [];
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

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllFunctionalitys();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllFunctionalitys();
    }
  }
  public mounted(): void {
    // this.retrieveAllFunctionalitys();
  }

  public clear(): void {
    this.retrieveAllFunctionalitys();
  }

  public retrieveAllFunctionalitys(): void {
    this.isFetching = true;

    this.functionalityService()
      .retrieve()
      .then(
        res => {
          this.functionalities = res.data;
          if (this.functionalities.length!== 0) {
            this.filterService()
              .FunctionalityFilter(this.functionalities, this.company_id)
              .then(res1 => {
                this.functionalities = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IFunctionality): void {
    this.removeId = instance.id!;
  }

  public removeFunctionality(): void {
    this.functionalityService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Functionality is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllFunctionalitys();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
