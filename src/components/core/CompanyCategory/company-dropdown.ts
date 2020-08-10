import { Component, Inject, Vue } from 'vue-property-decorator';
import CompanyService from '../../entities/company/company.service';
import { ICompany } from '../../shared/model/company.model';
import { bus } from '../../../main';

@Component
export default class CompanyDropdown extends Vue {
  @Inject('companyService') private companyService!: () => CompanyService;

  public companyDetails: ICompany[] = [];
  public selectedCompanyId: any = '';
  public disableButton = false;
  public previousUserId: number = 0;
  public company_id: number = 0;

  public get userid(): any {
    return this.$store.getters.account.id;
  }

  public mounted(): void {
    this.previousUserId = parseInt(localStorage.getItem('UserId'));
    this.company_id = parseInt(localStorage.getItem('CompanyId')!);
    console.log(this.company_id);
    this.retrieveCompanyDetails(parseInt(this.userid));
  }

  public beforeMount() {
    window.addEventListener('beforeunload', this.StoreCompanyId);
  }

  public StoreCompanyId(event: any) {
    console.log('inside store');
    localStorage.setItem('CompanyId', this.selectedCompanyId);
    localStorage.setItem('UserId', this.userid);
  }
  public retrieveCompanyDetails(userid: number) {
      this.companyService()
      .retrieve()
      .then(
        res => {
          this.companyDetails = res.data;
          this.companyDetails = this.companyDetails.filter(element => element.user?.id === userid);
          const data = this.companyDetails.filter(element => element.id === this.company_id);
          if (this.previousUserId === this.userid && (this.company_id!== 0) && (data.length!== 0)) {
            this.selectedCompanyId = this.company_id;
            console.log("inside if");
          } else {
            console.log("inside else");
            this.selectedCompanyId = this.companyDetails[0].id;
          }
          console.log(this.selectedCompanyId);
          localStorage.setItem('CompanyId', this.selectedCompanyId);
          bus.$emit('CompanyChange', this.selectedCompanyId);
        },
        err => {
          console.log(err);
        }
      );    
  }
  CompanyChange(): any {
    localStorage.setItem('CompanyId', this.selectedCompanyId);
    bus.$emit('CompanyChange', this.selectedCompanyId);
    return this.selectedCompanyId;
  }
}
