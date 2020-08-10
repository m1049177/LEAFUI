import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import LineOfBusinessService from '../line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';

import AlertService from '../../shared/alert/alert.service';
import { IApplication, Application } from '../../shared/model/application.model';
import ApplicationService from './application.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  application: {
    name: {
      required
    },
    description: {
      required
    },
    type: {
      required
    },
    status: {},
    implementationDate: {
      required
    }
  }
};

@Component({
  validations
})
export default class ApplicationUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;

  @Inject('filterService') private filterService!: () => FilterService;
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;

  public lineOfBusinesses: ILineOfBusiness[] = [];
  public isSaving = false;
  public application: IApplication = new Application();
  public company_id: number = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.applicationId) {
        vm.retrieveApplication(to.params.applicationId);
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
    if (this.application.id) {
      this.applicationService()
        .update(this.application)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Application is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.log(err); });
    } else {
      this.applicationService()
        .create(this.application)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Application is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.log(err); });
    }
  }

  public retrieveApplication(applicationId: number): void {
    this.applicationService()
      .find(applicationId)
      .then(res => {
        this.application = res;
      }).catch(err => { console.log(err); });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.lineOfBusinessService()
      .retrieve()
      .then(res => {
        this.lineOfBusinesses = res.data;
        if (this.lineOfBusinesses.length!== 0) {
          this.filterService()
            .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
            .then(res1 => {
              this.lineOfBusinesses = res1;
            });
        }
      }).catch(err => { console.log(err); });
  }
}
