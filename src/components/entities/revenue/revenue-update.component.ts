import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import LineOfBusinessService from '../line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';

import AlertService from '../../shared/alert/alert.service';
import { IRevenue, Revenue } from '../../shared/model/revenue.model';
import RevenueService from './revenue.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

const validations: any = {
  revenue: {
    date: {
      required
    },
    amount: {},
    successor: {
      required
    }
  }
};

@Component({
  validations
})
export default class RevenueUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('revenueService') private revenueService!: () => RevenueService;
  public revenue: IRevenue = new Revenue();

  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;

  public lineOfBusinesses: ILineOfBusiness[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.revenueId) {
        vm.retrieveRevenue(to.params.revenueId);
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
    if (this.revenue.id) {
      this.revenueService()
        .update(this.revenue)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Revenue is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.revenueService()
        .create(this.revenue)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Revenue is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveRevenue(revenueId: number): void {
    this.revenueService()
      .find(revenueId)
      .then(res => {
        this.revenue = res;
      }).catch(err => { console.error(err) });
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
            .then(response => {
              this.lineOfBusinesses = response;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
