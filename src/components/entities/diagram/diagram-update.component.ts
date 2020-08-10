import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import CompanyService from '../company/company.service';
import { ICompany } from '../../shared/model/company.model';

import AlertService from '../../shared/alert/alert.service';
import { IDiagram, Diagram } from '../../shared/model/diagram.model';
import DiagramService from './diagram.service';

const validations: any = {
  diagram: {
    category: {
      required
    },
    picture: {
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
export default class DiagramUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('diagramService') private diagramService!: () => DiagramService;
  public diagram: IDiagram = new Diagram();

  @Inject('companyService') private companyService!: () => CompanyService;

  $refs!: {
    idInput : any
  }
  public companies: ICompany[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.diagramId) {
        vm.retrieveDiagram(to.params.diagramId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    // console.log(this.diagram.picture);
    if (this.diagram.id) {
      this.diagramService()
        .update(this.diagram)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Diagram is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.diagramService()
        .create(this.diagram)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Diagram is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveDiagram(diagramId: number): void {
    this.diagramService()
      .find(diagramId)
      .then(res => {
        this.diagram = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field: string, fieldContentType: string, idInput: any): void {
    if (this.diagram && field && fieldContentType) {
        this.diagram.picture = "";
        this.diagram.pictureContentType = "";
  
      if (idInput) {
        this.$refs.idInput = null;
      }
    }
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      }).catch(err => { console.error(err) });
  }
}
