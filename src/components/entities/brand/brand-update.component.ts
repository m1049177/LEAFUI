import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import LineOfBusinessService from '../line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';

import AlertService from '../../shared/alert/alert.service';
import { IBrand, Brand } from '../../shared/model/brand.model';
import BrandService from './brand.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  brand: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class BrandUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('brandService') private brandService!: () => BrandService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public brand: IBrand = new Brand();

  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;

  public lineOfBusinesses: ILineOfBusiness[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.brandId) {
        vm.retrieveBrand(to.params.brandId);
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
    if (this.brand.id) {
      this.brandService()
        .update(this.brand)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Brand is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.brandService()
        .create(this.brand)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Brand is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveBrand(brandId: number): void {
    this.brandService()
      .find(brandId)
      .then(res => {
        this.brand = res;
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
            .then(res1 => {
              this.lineOfBusinesses = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
