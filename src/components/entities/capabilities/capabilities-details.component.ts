import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICapabilities } from '../../shared/model/capabilities.model';
import CapabilitiesService from './capabilities.service';

@Component
export default class CapabilitiesDetails extends Vue {
  @Inject('capabilitiesService') private capabilitiesService!: () => CapabilitiesService;
  public capabilities: ICapabilities = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.capabilitiesId) {
        vm.retrieveCapabilities(to.params.capabilitiesId);
      }
    });
  }

  public retrieveCapabilities(capabilitiesId: number) {
    this.capabilitiesService()
      .find(capabilitiesId)
      .then(res => {
        this.capabilities = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
