import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIntegration } from '../../shared/model/integration.model';
import IntegrationService from './integration.service';

@Component
export default class IntegrationDetails extends Vue {
  @Inject('integrationService') private integrationService!: () => IntegrationService;
  public integration: IIntegration = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.integrationId) {
        vm.retrieveIntegration(to.params.integrationId);
      }
    });
  }

  public retrieveIntegration(integrationId: number) {
    this.integrationService()
      .find(integrationId)
      .then(res => {
        this.integration = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
