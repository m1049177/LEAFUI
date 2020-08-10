import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IFunctionality, Functionality } from '../../shared/model/functionality.model';
import FunctionalityService from './functionality.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  functionality: {
    name: {
      required
    },
    majorModules: {
      required
    }
  }
};

@Component({
  validations
})
export default class FunctionalityUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('functionalityService') private functionalityService!: () => FunctionalityService;
  public functionality: IFunctionality = new Functionality();
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.functionalityId) {
        vm.retrieveFunctionality(to.params.functionalityId);
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
    if (this.functionality.id) {
      this.functionalityService()
        .update(this.functionality)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Functionality is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.functionalityService()
        .create(this.functionality)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Functionality is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveFunctionality(functionalityId: number): void {
    this.functionalityService()
      .find(functionalityId)
      .then(res => {
        this.functionality = res;
      });
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
            .then(res1 => {
              this.applications = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
