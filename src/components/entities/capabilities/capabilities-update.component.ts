import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import BusinessFunctionService from '../business-function/business-function.service';
import { IBusinessFunction } from '../../shared/model/business-function.model';

import AlertService from '../../shared/alert/alert.service';
import { ICapabilities, Capabilities } from '../../shared/model/capabilities.model';
import CapabilitiesService from './capabilities.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  capabilities: {
    description: {
      required
    }
  }
};

@Component({
  validations
})
export default class CapabilitiesUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('capabilitiesService') private capabilitiesService!: () => CapabilitiesService;
  @Inject('businessFunctionService') private businessFunctionService!: () => BusinessFunctionService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public capabilities: ICapabilities = new Capabilities();
  public businessFunctions: IBusinessFunction[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.capabilitiesId) {
        vm.retrieveCapabilities(to.params.capabilitiesId);
      }
      // vm.initRelationships();
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
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
    if (this.capabilities.id) {
      this.capabilitiesService()
        .update(this.capabilities)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          console.log('A Capabilities is updated with identifier ' + param.id);
          const message = 'A Capabilities is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.capabilitiesService()
        .create(this.capabilities)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Capabilities is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveCapabilities(capabilitiesId: number): void {
    this.capabilitiesService()
      .find(capabilitiesId)
      .then(res => {
        this.capabilities = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.businessFunctionService()
      .retrieve()
      .then(res => {
        this.businessFunctions = res.data;
        if (this.businessFunctions.length!== 0) {
          this.filterService()
            .BusinessFunctionFilter(this.businessFunctions, this.company_id)
            .then(res1 => {
              this.businessFunctions = res1;
            });
        }
      });
  }
}
