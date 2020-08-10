import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMaintenance } from '../../shared/model/maintenance.model';
import MaintenanceService from './maintenance.service';

@Component
export default class MaintenanceDetails extends Vue {
  @Inject('maintenanceService') private maintenanceService!: () => MaintenanceService;
  public maintenance: IMaintenance = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.maintenanceId) {
        vm.retrieveMaintenance(to.params.maintenanceId);
      }
    });
  }

  public retrieveMaintenance(maintenanceId: number) {
    this.maintenanceService()
      .find(maintenanceId)
      .then(res => {
        this.maintenance = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
