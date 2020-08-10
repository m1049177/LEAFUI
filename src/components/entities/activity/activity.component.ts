import { Component, Inject, Vue } from 'vue-property-decorator';
import { IActivity } from '../../shared/model/activity.model';
import AlertService from '../../shared/alert/alert.service';

import ActivityService from './activity.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Activity extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('activityService') private activityService!: () => ActivityService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public activities: IActivity[] = [];
  $refs!:{
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
    // this.retrieveAllActivitys();
  }
  public created(): void {
    bus.$on('CompanyChange', (obj:any) => {
      this.company_id = obj;
      this.retrieveAllActivitys();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllActivitys();
    }
  }
  public clear(): void {
    this.retrieveAllActivitys();
  }

  public retrieveAllActivitys(): void {
    this.isFetching = true;

    this.activityService()
      .retrieve()
      .then(
        res => {
          this.activities = res.data;
          if (this.activities.length!== 0) {
            this.filterService()
              .ActivityFilter(this.activities, this.company_id)
              .then((res1: any) => {
                this.activities = res1;
              });
          }
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.error(err); 
        this.isFetching = false;
      })
  }

  public prepareRemove(instance: IActivity): void {
    this.removeId = instance.id!;
  }

  public removeActivity(): void {
    this.activityService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Activity is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllActivitys();
        this.closeDialog();
      }).catch(err => {
        console.error(err);
      })
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
