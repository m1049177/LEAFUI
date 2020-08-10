import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CapabilitiesService from '../capabilities/capabilities.service';
import { ICapabilities } from '../../shared/model/capabilities.model';

import AlertService from '../../shared/alert/alert.service';
import { IBusinessProcess, BusinessProcess } from '../../shared/model/business-process.model';
import BusinessProcessService from './business-process.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  businessProcess: {
    name: {
      required
    },
    startDate: {
      required
    },
    expectedEndDate: {},
    endDate: {},
    status: {
      required
    }
  }
};

@Component({
  validations
})
export default class BusinessProcessUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('businessProcessService') private businessProcessService!: () => BusinessProcessService;
  @Inject('capabilitiesService') private capabilitiesService!: () => CapabilitiesService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public businessProcess: IBusinessProcess = new BusinessProcess();
  public capabilities: ICapabilities[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.businessProcessId) {
        vm.retrieveBusinessProcess(to.params.businessProcessId);
      }
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
    if (this.businessProcess.id) {
      this.businessProcessService()
        .update(this.businessProcess)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BusinessProcess is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.businessProcessService()
        .create(this.businessProcess)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BusinessProcess is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveBusinessProcess(businessProcessId: number): void {
    this.businessProcessService()
      .find(businessProcessId)
      .then(res => {
        this.businessProcess = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.capabilitiesService()
      .retrieve()
      .then(res => {
        this.capabilities = res.data;
        if (this.capabilities.length!== 0) {
          this.filterService()
            .CapabilitiesFilter(this.capabilities, this.company_id)
            .then(res1 => {
              this.capabilities = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
