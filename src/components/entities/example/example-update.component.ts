import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { IExample, Example } from '../../shared/model/example.model';
import ExampleService from './example.service';

const validations: any = {
  example: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class ExampleUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('exampleService') private exampleService!: () => ExampleService;
  public example: IExample = new Example();
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.exampleId) {
        vm.retrieveExample(to.params.exampleId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.example.id) {
      this.exampleService()
        .update(this.example)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Example is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      let message = '';
      this.exampleService()
        .create(this.example)
        .then(param => {
          this.isSaving = false;
          // this.$router.go(-1);
          message = 'A Example is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
      if (message === '') {
        alert('alredy exist');
      }
    }
  }

  public retrieveExample(exampleId: number): void {
    this.exampleService()
      .find(exampleId)
      .then(res => {
        this.example = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
