import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IMaintenance, Maintenance } from '../../shared/model/maintenance.model';
import MaintenanceService from './maintenance.service';

const validations: any = {
  maintenance: {
    startDate: {
      required
    },
    endDate: {
      required
    }
  }
};

@Component({
  validations
})
export default class MaintenanceUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('maintenanceService') private maintenanceService!: () => MaintenanceService;
  public maintenance: IMaintenance = new Maintenance();

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.maintenanceId) {
        vm.retrieveMaintenance(to.params.maintenanceId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.maintenance.id) {
      this.maintenanceService()
        .update(this.maintenance)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Maintenance is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.maintenanceService()
        .create(this.maintenance)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Maintenance is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveMaintenance(maintenanceId: number): void {
    this.maintenanceService()
      .find(maintenanceId)
      .then(res => {
        this.maintenance = res;
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
      }).catch(err => { console.error(err) });
  }
}
