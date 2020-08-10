import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { ITechnologyStack, TechnologyStack } from '../../shared/model/technology-stack.model';
import TechnologyStackService from './technology-stack.service';
import { bus } from '../../../main';
import LabelService from '../label/label.service';
import { ILabel } from '../../shared/model/label.model';

const validations: any = {
  technologyStack: {
    name: {
      required
    },
    type: {
      required
    }
  },
  version: {
    required,
    numberValidation(version: string) {
      return /^(\d{0,3})(.\d{0,3}?)(.\d{0,2})?$/.test(version);
    }
  }
};

@Component({
  validations
})
export default class TechnologyStackUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologyStackService') private technologyStackService!: () => TechnologyStackService;
  @Inject('labelService') private labelService!: () => LabelService;
  public technologyStack: ITechnologyStack = new TechnologyStack();
  public technologyStackData: ITechnologyStack[] = [];
  public technologyName: string[] = [];
  public labels: ILabel[] = [];
  public label: ILabel = {};
  public checkForExistences = true;
  public technologies: ITechnologyStack[] = [];
  public isSaving = false;
  public version = '';
  public companyId: number = 0;
  public toAddNewTechnology = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.technologyStackId) {
        vm.retrieveTechnologyStack(to.params.technologyStackId);
      }

      vm.initRelationships();
    });
  }
  public created() {
    bus.$on('CompanyChange', (obj: any) => {
      this.companyId = obj;
      console.log(this.companyId);
      this.retrieveAllLabelData();
    });
    if (this.companyId === 0) {
      this.companyId = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllLabelData();
    }
  }
  public mounted(): void {
    this.retrieveAllTechnologyStackData();
  }

  public save(): void {
    this.isSaving = true;
    const name = this.technologyStack.name!.trim() + '-' + this.version;
    if (this.checkAlreadyExist(name)) {
      if (this.technologyStack.id) {
        if (this.version.trim()!== '0') {
          this.technologyStack.name = this.technologyStack.name!.trim() + '-' + this.version;
        }
        this.technologyStackService()
          .update(this.technologyStack)
          .then(param => {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A TechnologyStack is updated with identifier ' + param.id;
            console.log(message);
            this.alertService().showAlert(message, 'info');
          }).catch(err => { console.error(err) });
      } else {
        if (this.version.trim()!== '0') {
          this.technologyStack.name = this.technologyStack.name!.trim() + '-' + this.version;
        }
        this.technologyStackService()
          .create(this.technologyStack)
          .then(param => {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A TechnologyStack is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }).catch(err => { console.error(err) });
      }
    } else {
      console.log('inside else');
      this.$router.go(-1);
      const message = 'A TechnologyStack is already exists.';
      this.alertService().showAlert(message, 'danger');
    }
  }

  public retrieveTechnologyStack(technologyStackId: number): void {
    this.technologyStackService()
      .find(technologyStackId)
      .then(res => {
        this.technologyStack = res;
        const result = this.technologyStack.name!.split('-');
        this.technologyStack.name = result[0];
        this.version = result[1];
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships() {
    this.technologyStackService()
      .retrieve()
      .then(res => {
        this.technologies = res.data;
      }).catch(err => { console.error(err) });
  }

  public retrieveAllTechnologyStackData(): void {
    this.technologyStackService()
      .retrieve()
      .then(
        res => {
          this.technologyStackData = res.data;
          this.technologyName = this.technologyStackData.map(element => element.name!);
        },
        error => {
          console.log(error);
        }
      ).catch(err => { console.error(err) });
  }

  public checkAlreadyExist(name: string) {
    if (this.technologyName.includes(name)) {
      this.checkForExistences = false;
      this.isSaving = false;
    }
    return this.checkForExistences;
  }

  public retrieveAllLabelData() {
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
        this.labels.forEach(element => {
          if (element.company?.id === this.companyId && element.label_type === 'TechnologyBucket') {
            this.label = element;
          }
        });
        this.label.label_data = JSON.parse(this.label.label_data);
      }).catch(err => { console.error(err) });
  }
}
