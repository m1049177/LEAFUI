import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IIntegration, Integration } from '../../shared/model/integration.model';
import IntegrationService from './integration.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  integration: {
    flowType: {
      required
    },
    entity: {
      required
    },
    integrationApp: {
      required
    }
  }
};

@Component({
  validations
})
export default class IntegrationUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('integrationService') private integrationService!: () => IntegrationService;
  public integration: IIntegration = new Integration();
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.integrationId) {
        vm.retrieveIntegration(to.params.integrationId);
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
    console.log(this.integration);
    if (this.integration.id) {
      this.integrationService()
        .update(this.integration)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Integration is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.integrationService()
        .create(this.integration)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Integration is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveIntegration(integrationId: number): void {
    this.integrationService()
      .find(integrationId)
      .then(res => {
        this.integration = res;
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
        if (this.applications.length!== 0) {
          this.filterService()
            .ApplicationFilter(this.applications, this.company_id)
            .then(response => {
              this.applications = response;
              console.log(this.applications);
            });
        }
      }).catch(err => { console.error(err) });
  }
}
