import { Component, Vue, Inject } from 'vue-property-decorator';

import { IExample } from '../../shared/model/example.model';
import ExampleService from './example.service';

@Component
export default class ExampleDetails extends Vue {
  @Inject('exampleService') private exampleService!: () => ExampleService;
  public example: IExample = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.exampleId) {
        vm.retrieveExample(to.params.exampleId);
      }
    });
  }

  public retrieveExample(exampleId: number) {
    this.exampleService()
      .find(exampleId)
      .then(res => {
        this.example = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
