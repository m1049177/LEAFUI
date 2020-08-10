import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IBudget, Budget } from '../../shared/model/budget.model';
import BudgetService from './budget.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  budget: {
    amount: {
      required,
      numeric
    },
    year: {
      required,
      numeric
    },
    successor: {
      required
    },
    application: {
      required
    }
  }
};

@Component({
  validations
})
export default class BudgetUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('budgetService') private budgetService!: () => BudgetService;
  public budget: IBudget = new Budget();

  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.budgetId) {
        vm.retrieveBudget(to.params.budgetId);
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
    if (this.budget.id) {
      this.budgetService()
        .update(this.budget)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Budget is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.budgetService()
        .create(this.budget)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Budget is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveBudget(budgetId: number): void {
    this.budgetService()
      .find(budgetId)
      .then(res => {
        this.budget = res;
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
  }
}
