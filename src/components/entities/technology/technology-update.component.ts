import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import TechnologyStackService from '../technology-stack/technology-stack.service';
import { ITechnologyStack } from '../../shared/model/technology-stack.model';

import AlertService from '../../shared/alert/alert.service';
import { ITechnology, Technology } from '../../shared/model/technology.model';
import TechnologyService from './technology.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

const validations: any = {
  technology: {}
};

@Component({
  validations
})
export default class TechnologyUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('technologyStackService') private technologyStackService!: () => TechnologyStackService;
  public applications: IApplication[] = [];
  public technology: ITechnology = new Technology();
  @Inject('filterService') private filterService!: () => FilterService;

  public technologyStacks: ITechnologyStack[] = [];
  public isSaving = false;
  public company_id: number = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyId) {
        vm.retrieveTechnology(to.params.technologyId);
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
    if (this.technology.id) {
      this.technologyService()
        .update(this.technology)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Technology is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.technologyService()
        .create(this.technology)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Technology is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveTechnology(technologyId: number): void {
    this.technologyService()
      .find(technologyId)
      .then(res => {
        this.technology = res;
        console.log(this.technology);
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
            });
        }
      }).catch(err => { console.error(err) });
    this.technologyStackService()
      .retrieve()
      .then(res => {
        this.technologyStacks = res.data;
      }).catch(err => { console.error(err) });
  }
}
