import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import BusinessProcessService from '../business-process/business-process.service';
import { IBusinessProcess } from '../../shared/model/business-process.model';

import AlertService from '../../shared/alert/alert.service';
import { IActivity, Activity } from '../../shared/model/activity.model';
import ActivityService from './activity.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  activity: {
    name: {
      required
    },
    description: {
      required
    },
    resourcesRequired: {
      required
    }
  }
};

@Component({
  validations
})
export default class ActivityUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('activityService') private activityService!: () => ActivityService;
  @Inject('businessProcessService') private businessProcessService!: () => BusinessProcessService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public activity: IActivity = new Activity();
  public businessProcesses: IBusinessProcess[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.activityId) {
        vm.retrieveActivity(to.params.activityId);
      }
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj:any) => {
      this.company_id = obj;
      this.initRelationships();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.initRelationships();
    }
  }
  public save(): void {
    this.isSaving = true;
    if (this.activity.id) {
      this.activityService()
        .update(this.activity)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Activity is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err); })
    } else {
      this.activityService()
        .create(this.activity)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Activity is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err); })
    }
  }

  public retrieveActivity(activityId: number): void {
    this.activityService()
      .find(activityId)
      .then(res => {
        this.activity = res;
      }).catch(err => { console.error(err); })
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.businessProcessService()
      .retrieve()
      .then(res => {
        this.businessProcesses = res.data;
        if (this.businessProcesses.length!== 0) {
          this.filterService()
            .BusinessProcessFilter(this.businessProcesses, this.company_id)
            .then((res1: any) => {
              this.businessProcesses = res1;
            });
        }
      }).catch(err => { console.error(err); })
  }
}
