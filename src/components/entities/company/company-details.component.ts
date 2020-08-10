import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICompany } from '../../shared/model/company.model';
import CompanyService from './company.service';

@Component
export default class CompanyDetails extends Vue {
  @Inject('companyService') private companyService!: () => CompanyService;
  public company: ICompany = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.companyId) {
        vm.retrieveCompany(to.params.companyId);
      }
    });
  }

  public retrieveCompany(companyId: number) {
    this.companyService()
      .find(companyId)
      .then(res => {
        this.company = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
