import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CompanyService from '../company/company.service';
import { ICompany } from '../../shared/model/company.model';

import AlertService from '../../shared/alert/alert.service';
import { ILabel, Label } from '../../shared/model/label.model';
import LabelService from './label.service';

const validations: any = {
  label: {
    label_type: {},
    label_data: {
      required
    },
    company: {
      required
    }
  }
};

@Component({
  validations
})
export default class LabelUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('labelService') private labelService!: () => LabelService;
  public label: ILabel = new Label();

  @Inject('companyService') private companyService!: () => CompanyService;

  public companies: ICompany[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    // this.label.label_data = [
    //   { name: "INFRA" , label_id: 'INFRA'},
    //   { name: "LICENSE" , label_id: 'LICENSE'},
    //   { name: "DEVELOPMENT" , label_id: 'DEVELOPMENT'},
    //   { name: "SUPPORTCOST" , label_id: 'SUPPORTCOST'},
    //   { name: "MISCELLANEOUS" , label_id: 'MISCELLANEOUS'},
    // ]
    this.label.label_type = 'TechnologyBucket';
    this.label.label_data = [
      { name: 'CLIENT', label_id: 'CLIENT', versionRisk: true },
      { name: 'SERVER', label_id: 'SERVER', versionRisk: true },
      { name: 'DATABASE', label_id: 'DATABASE', versionRisk: true },
      { name: 'CLOUD', label_id: 'CLOUD', versionRisk: false },
      { name: 'STORAGE', label_id: 'STORAGE', versionRisk: false },
      { name: 'MIDDLEWARE', label_id: 'MIDDLEWARE', versionRisk: true }
    ];
    this.label.label_data = JSON.stringify(this.label.label_data);
    if (this.label.id) {
      this.labelService()
        .update(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Label is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.labelService()
        .create(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Label is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveLabel(labelId: number): void {
    this.labelService()
      .find(labelId)
      .then(res => {
        this.label = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      }).catch(err => { console.error(err) });
  }
}
