import { Component, Inject, Vue } from 'vue-property-decorator';
import { IBrand } from '../../shared/model/brand.model';
import AlertService from '../../shared/alert/alert.service';

import BrandService from './brand.service';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';

@Component
export default class Brand extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('brandService') private brandService!: () => BrandService;
  @Inject('filterService') private filterService!: () => FilterService;

  $refs!: {
    removeEntity: HTMLFormElement
  }
  public company_id: number = 0;
  private removeId: number = 0;
  public brands: IBrand[] = [];

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
      this.retrieveAllBrands();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllBrands();
    }
  }
  public mounted(): void {
    // this.retrieveAllBrands();
  }

  public clear(): void {
    this.retrieveAllBrands();
  }

  public retrieveAllBrands(): void {
    this.isFetching = true;

    this.brandService()
      .retrieve()
      .then(
        res => {
          this.brands = res.data;
          if (this.brands.length!== 0) {
            this.filterService()
              .BrandFilter(this.brands, this.company_id)
              .then(res1 => {
                this.brands = res1;
              });
          }
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

  public prepareRemove(instance: IBrand): void {
    this.removeId = instance.id!;
  }

  public removeBrand(): void {
    this.brandService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Brand is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllBrands();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
