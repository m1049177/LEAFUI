import { Component, Inject, Vue } from 'vue-property-decorator';
import { VERSION } from '../../../constants';
import LoginService from '../../account/login.service';
import AccountService from '../../account/account.service';
import { ICompany } from '../../shared/model/company.model';
import CompanyDropdownComponent from '../../core/CompanyCategory/company-dropdown.vue';
import ReportService from '../../entities/report/report.service';
import SideNavBar from '../side-navbar/sideNavBar.vue';
import { bus } from '../../../main';
import CompanyService from '@/components/entities/company/company.service';

@Component({
  components: {
    companyDropdown: CompanyDropdownComponent,
    SideNavBar: SideNavBar
  }
})
export default class JhiNavbar extends Vue {
  @Inject('loginService')
  private loginService!: () => LoginService;

  @Inject('accountService') private accountService!: () => AccountService;
  @Inject('reportService') private reportService!: () => ReportService;
  @Inject('companyService') private companyService!: () => CompanyService;
  public version = VERSION ? 'v' + VERSION : '';
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;
  public companyDetails: ICompany[] = [];
  public selectedCompanyId: any = '';
  public disableButton = false;
  public searchQuery: string = '';
  public company_id = 0;
  public companyName = "";

  public subIsActive(input: any) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }

  public logout(): void {
    localStorage.removeItem('jhi-authenticationToken');
    sessionStorage.removeItem('jhi-authenticationToken');
    this.$store.commit('logout');
    this.$router.push('/');
  }

  public created() {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = parseInt(obj);
      if(this.company_id!== 0) {
        this.companyService().find(this.company_id).then(res => {
          this.companyName = res.companyName!
        })
      }
    });
    if(this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!)
      this.companyService().find(this.company_id).then(response => {
        this.companyName = response.companyName!
      })
    }
  }

  public openLogin(): void {
    this.loginService().openLogin(this.$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public hasAnyAuthority(authorities: any): boolean {
    return this.accountService().hasAnyAuthority(authorities);
  }

  public get swaggerEnabled(): boolean {
    return false;
    //return this.$store.getters.activeProfiles.indexOf('swagger') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }

  public mounted(): void {}

  public pdfGenerator() {
    console.log('pdf generator');
    this.reportService()
      .pdfGenerator()
      .then((res: any) => {
        console.log(res);
      });
  }

  public searchTextChange() {
    bus.$emit('searchQuery', this.searchQuery);
  }

  public search() {
    this.$router.push({ name: 'Search', params: { searchQuery: this.searchQuery } });
    // console.log(this.searchQuery);
  }
}
