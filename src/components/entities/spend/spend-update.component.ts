import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { ISpend, Spend } from '../../shared/model/spend.model';
import SpendService from './spend.service';
import TechnologyService from '../technology/technology.service';
import ExpenditureService from '../expenditure/expenditure.service';
import { ITechnology } from '../../shared/model/technology.model';
import FilterService from '../../shared/service/filter.service';
import { IExpenditure } from '../../shared/model/expenditure.model';
import { bus } from '../../../main';
import LabelService from '../label/label.service';
import { ILabel } from '../../shared/model/label.model';

const validations: any = {
  spend: {
    dateOfUpdate: {
      required
    },
    amount: {
      required,
      numeric
    },
    spendId: {
      required,
      numeric
    },
    expenditureType: {
      required
    },
    expenditureSubType: {},
    successor: {
      required
    }
  }
};

@Component({
  validations
})
export default class SpendUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('spendService') private spendService!: () => SpendService;
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('expenditureService') private expenditureService!: () => ExpenditureService;
  @Inject('labelService') private labelService!: () => LabelService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public spend: ISpend = new Spend();
  public isSaving = false;
  public labels: ILabel[] = [];
  public labelData: ILabel = {};
  public technologies: ITechnology[] = [];
  public infraTechnologies: ITechnology[] = [];
  public licenseTechnologies: ITechnology[] = [];

  public expenditures: IExpenditure[] = [];
  public developmentExpenditure: IExpenditure[] = [];
  public supportExpenditure: IExpenditure[] = [];
  public miscellaneousExpenditure: IExpenditure[] = [];
  public expenditureCategories: any[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.spendId) {
        vm.retrieveSpend(to.params.spendId);
      }
      // vm.retrieveAllData();
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;

    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
    }
    this.retrieveLabelData().then(res => {
      this.retrieveAllData();
    }).catch(err => { console.error(err) });
  }

  public save(): void {
    this.isSaving = true;
    if (this.spend.id) {
      this.spendService()
        .update(this.spend)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Spend is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.spendService()
        .create(this.spend)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Spend is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveSpend(spendId: number): void {
    console.log('welcome');
    this.spendService()
      .find(spendId)
      .then(res => {
        this.spend = res;
      }).catch(err => { console.error(err) });
  }

  public retrieveLabelData() {
    return new Promise(resolve => {
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
          console.log(this.labelData);
        });
      resolve(this.labelData);
    });
  }
  public retrieveAllData(): void {
    this.technologyService()
      .retrieve()
      .then(res => {
        this.technologies = res.data;
        if (this.technologies.length!== 0) {
          this.filterService()
            .TechnologyFilter(this.technologies, this.company_id)
            .then(result => {
              this.technologies = result;
              this.technologies.forEach(technology => {
                if (technology.technologyStack?.type === 'CLOUD') {
                  this.infraTechnologies.push(technology);
                } else {
                  this.licenseTechnologies.push(technology);
                }
              });
            });
        }
      }).catch(err => { console.error(err) });
    this.expenditureService()
      .retrieve()
      .then(res => {
        this.expenditures = res.data;
        if (this.expenditures.length!== 0) {
          this.filterService()
            .ExpenditureFilter(this.expenditures, this.company_id)
            .then(res1 => {
              this.expenditures = res1;
              for (let i = 2; i < this.labelData.label_data.length; i++) {
                this.expenditures.forEach(expenditure => {
                  if (expenditure.expenditureType === this.labelData.label_data[i].name) {
                    this.expenditureCategories.push({ type: this.labelData.label_data[i].name, expenditure: expenditure });
                  }
                });
              }
            });
        }
      }).catch(err => { console.error(err) });
    console.log(this.expenditureCategories);
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
