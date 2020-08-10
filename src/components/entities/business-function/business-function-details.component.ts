import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBusinessFunction } from '../../shared/model/business-function.model';
import BusinessFunctionService from './business-function.service';

@Component
export default class BusinessFunctionDetails extends Vue {
  @Inject('businessFunctionService') private businessFunctionService!: () => BusinessFunctionService;
  public businessFunction: IBusinessFunction = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.businessFunctionId) {
        vm.retrieveBusinessFunction(to.params.businessFunctionId);
      }
    });
  }

  public retrieveBusinessFunction(businessFunctionId: number) {
    this.businessFunctionService()
      .find(businessFunctionId)
      .then(res => {
        this.businessFunction = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
