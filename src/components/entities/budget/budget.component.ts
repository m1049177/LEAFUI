import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBudget } from '../../shared/model/budget.model';
import AlertService from '../../shared/alert/alert.service';

import BudgetService from './budget.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Budget extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('budgetService') private budgetService!: () => BudgetService;
  @Inject('filterService') private filterService!: () => FilterService;

  $refs!: {
    removeEntity: HTMLFormElement
  }
  public company_id: number = 0;
  private removeId: number = 0;
  public itemsPerPage = 20;
  public queryCount: number = 0;
  public page = 1;
  public previousPage: number = 0;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public budgets: IBudget[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllBudgets();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllBudgets();
    }
  }

  public mounted(): void {
    //this.retrieveAllBudgets();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBudgets();
  }

  public retrieveAllBudgets(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    this.budgetService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.budgets = res.data;
          if (this.budgets.length!== 0) {
            this.filterService()
              .BudgetFilter(this.budgets, this.company_id)
              .then(response => {
                this.budgets = response;
              });
          }
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { 
        console.error(err);
        this.isFetching = false;
      });
  }

  public prepareRemove(instance: IBudget): void {
    this.removeId = instance.id!;
  }

  public removeBudget(): void {
    this.budgetService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Budget is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllBudgets();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllBudgets();
  }

  public changeOrder(propOrder: any): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
