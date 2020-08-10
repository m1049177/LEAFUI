import { Component, Inject, Vue } from 'vue-property-decorator';
import { ICapabilities } from '../../shared/model/capabilities.model';
import AlertService from '../../shared/alert/alert.service';

import CapabilitiesService from './capabilities.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Capabilities extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('capabilitiesService') private capabilitiesService!: () => CapabilitiesService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public capabilities: ICapabilities[] = [];
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

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllCapabilitiess();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllCapabilitiess();
    }
  }
  public mounted(): void {
    //this.retrieveAllCapabilitiess();
  }

  public clear(): void {
    this.retrieveAllCapabilitiess();
  }

  public retrieveAllCapabilitiess(): void {
    this.isFetching = true;

    this.capabilitiesService()
      .retrieve()
      .then(
        res => {
          this.capabilities = res.data;
          if (this.capabilities.length!== 0) {
            this.filterService()
              .CapabilitiesFilter(this.capabilities, this.company_id)
              .then(res1 => {
                this.capabilities = res1;
                this.isFetching = false;
              });
          }
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.error(err);
      this.isFetching = false;
     });
  }

  public prepareRemove(instance: ICapabilities): void {
    this.removeId = instance.id!;
  }

  public removeCapabilities(): void {
    this.capabilitiesService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Capabilities is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllCapabilitiess();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
