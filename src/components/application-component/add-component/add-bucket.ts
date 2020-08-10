import { Component, Inject, Vue } from 'vue-property-decorator';
import LabelService from '../../entities/label/label.service';
import { ILabel, Label } from '../../shared/model/label.model';
import { required } from 'vuelidate/lib/validators';
import AlertService from '../../shared/alert/alert.service';
import { bus } from '../../../main';

const validations: any = {
  bucketName: {
    required,
    // checkForExistences(bucketName : string) : boolean {
    //   return !this.technologyType.includes(bucketName.toUpperCase());
    // }
  },
  spendType: {
    required,
    // checkForExistences(spendType: string) : boolean {
    //   return !this.spendTypeLabel.includes(spendType.toUpperCase());
    // }
  }
};
@Component({
  validations
})
export default class AddBucket extends Vue {
  @Inject('labelService') private labelService!: () => LabelService;
  @Inject('alertService') private alertService!: () => AlertService;

  public addString: string = '';
  public bucketName: string = '';
  public spendType: string = '';
  public versionRisk: boolean = false;
  public labels: ILabel[] = [];
  public spendTypeLabel: string[] = [];
  public technologyData: ILabel = {};
  public spendData: ILabel = {};
  public technologyType: string[] = [];
  public company_id: number = 0;

  public created(): void {
    this.addString = this.$route.params.addString;
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveLabelData();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveLabelData();
    }
  }

  public retrieveLabelData() {
    this.spendTypeLabel = [];
    this.spendData = {};
    this.technologyData = {};
    this.technologyType = [];
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
        this.labels = this.labels.filter(element => element.company?.id === this.company_id);
        this.labels.forEach(labelData => {
          if (labelData.label_type === 'TechnologyBucket') {
            this.technologyData = labelData;
            this.technologyData.label_data = JSON.parse(this.technologyData.label_data);
            this.technologyData.label_data.forEach((item: any) => {
              this.technologyType.push(item.name);
            });
          }
          if (labelData.label_type === 'SpendType') {
            this.spendData = labelData;
            this.spendData.label_data = JSON.parse(this.spendData.label_data);
            this.spendData.label_data.forEach((item: any) => {
              this.spendTypeLabel.push(item.name);
            });
          }
        });
      })
      .catch(error => { console.log(error); })
  }

  upper(e: any) {
    e.target.value = e.target.value.toUpperCase();
  }

  public addnewBucket() {
    console.log(this.bucketName + this.versionRisk);
    if(this.technologyType.includes(this.bucketName.toUpperCase())) {
      this.$root.$emit('bv::show::modal', 'bucketModal');
      this.bucketName = "";
    } else if(!this.technologyType.includes(this.bucketName.toUpperCase())) {
      this.technologyData.label_data.push({
        name: this.bucketName.toUpperCase(),
        label_id: this.bucketName.toUpperCase(),
        versionRisk: this.versionRisk
      });
      this.technologyData.label_data = JSON.stringify(this.technologyData.label_data);
      console.log(this.technologyData.label_data);
  
      if (this.technologyData.id) {
        this.labelService()
          .update(this.technologyData)
          .then(param => {
            this.$router.go(-1);
            const message = 'A Label is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
            this.retrieveLabelData();
          })
          .catch(error => { console.log(error); })
      }
    }
  }

  public addSpendType() {
    if(this.spendTypeLabel.includes(this.spendType.toUpperCase())) {
      this.$root.$emit('bv::show::modal', 'typeModal');
      this.spendType = "";
    } else if(!this.spendTypeLabel.includes(this.spendType.toUpperCase())) {
      this.spendData.label_data.push({ name: this.spendType.toUpperCase(), label_id: this.spendType.toUpperCase() });
      this.spendData.label_data = JSON.stringify(this.spendData.label_data);
      console.log(this.spendData.label_data);

      if (this.spendData.id) {
        this.labelService()
          .update(this.spendData)
          .then(param => {
            this.$router.go(-1);
            const message = 'A Label is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
            this.retrieveLabelData();
          })
          .catch(error => { console.log(error); })
      }
    }
  }

  public previousState(): void {
    this.$router.go(-1);
  }
}
