import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBrand } from '../../shared/model/brand.model';
import BrandService from './brand.service';

@Component
export default class BrandDetails extends Vue {
  @Inject('brandService') private brandService!: () => BrandService;
  public brand: IBrand = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.brandId) {
        vm.retrieveBrand(to.params.brandId);
      }
    });
  }

  public retrieveBrand(brandId: number) {
    this.brandService()
      .find(brandId)
      .then(res => {
        this.brand = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
