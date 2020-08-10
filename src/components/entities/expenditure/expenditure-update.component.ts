import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IExpenditure, Expenditure } from '../../shared/model/expenditure.model';
import ExpenditureService from './expenditure.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';
import { ILabel } from '../../shared/model/label.model';
import LabelService from '../label/label.service';

const validations: any = {
  expenditure: {
    expenditureType: {
      required
    },
    description: {
      required
    },
    startDate: {
      required
    },
    endDate: {},
    application: {
      required
    }
  }
};

@Component({
  validations
})
export default class ExpenditureUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('expenditureService') private expenditureService!: () => ExpenditureService;
  public expenditure: IExpenditure = new Expenditure();
  @Inject('filterService') private filterService!: () => FilterService;
  @Inject('labelService') private labelService!: () => LabelService;

  public company_id: number = 0;

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;
  public labels: ILabel[] = [];
  public labelData: ILabel = {};
  public spendType: any[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.expenditureId) {
        vm.retrieveExpenditure(to.params.expenditureId);
      }
    });
  }
  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveLabelData().then(res => {
        this.initRelationships();
      }).catch(err => { console.error(err) });
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveLabelData().then(res => {
        this.initRelationships();
      }).catch(err => { console.error(err) });
    }
  }

  public save(): void {
    this.isSaving = true;
    if (this.expenditure.id) {
      this.expenditureService()
        .update(this.expenditure)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Expenditure is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.expenditureService()
        .create(this.expenditure)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Expenditure is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveLabelData() {
    return new Promise(resolve => {
      this.labelData = {};
      this.labels = [];
      this.spendType = [];
      this.labelService()
        .retrieve()
        .then(result => {
          this.labels = result.data;
          this.labels = this.labels.filter(element => element.company?.id === this.company_id);
          this.labels.forEach(label => {
            if (label.label_type === 'SpendType') {
              this.labelData = label;
              this.labelData.label_data = JSON.parse(this.labelData.label_data);
            }
          });
          for (let i = 2; i < this.labelData.label_data.length; i++) {
            this.spendType.push(this.labelData.label_data[i].name);
          }
        });
      console.log(this.spendType);
      resolve(this.labelData);
    });
  }

  public retrieveExpenditure(expenditureId: number): void {
    this.expenditureService()
      .find(expenditureId)
      .then(res => {
        this.expenditure = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.applicationService()
      .retrieve()
      .then(res => {
        this.applications = res.data;
        if (this.applications.length!== 0) {
          this.filterService()
            .ApplicationFilter(this.applications, this.company_id)
            .then(res1 => {
              this.applications = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }
}
