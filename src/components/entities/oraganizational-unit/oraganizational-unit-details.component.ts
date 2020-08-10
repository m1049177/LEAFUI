import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOraganizationalUnit } from '../../shared/model/oraganizational-unit.model';
import OraganizationalUnitService from './oraganizational-unit.service';

@Component
export default class OraganizationalUnitDetails extends Vue {
  @Inject('oraganizationalUnitService') private oraganizationalUnitService!: () => OraganizationalUnitService;
  public oraganizationalUnit: IOraganizationalUnit = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.oraganizationalUnitId) {
        vm.retrieveOraganizationalUnit(to.params.oraganizationalUnitId);
      }
    });
  }

  public retrieveOraganizationalUnit(oraganizationalUnitId: number) {
    this.oraganizationalUnitService()
      .find(oraganizationalUnitId)
      .then(res => {
        this.oraganizationalUnit = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
