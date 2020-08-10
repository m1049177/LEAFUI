import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IChange, Change } from '../../shared/model/change.model';
import ChangeService from './change.service';

const validations: any = {
  change: {
    description: {
      required
    },
    dateOfChange: {
      required
    }
  }
};

@Component({
  validations
})
export default class ChangeUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('changeService') private changeService!: () => ChangeService;
  public change: IChange = new Change();

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.changeId) {
        vm.retrieveChange(to.params.changeId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.change.id) {
      this.changeService()
        .update(this.change)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Change is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.changeService()
        .create(this.change)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Change is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveChange(changeId: number): void {
    this.changeService()
      .find(changeId)
      .then(res => {
        this.change = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.applicationService()
      .retrieve()
      .then(res => {
        this.applications = res.data;
      });
  }
}
