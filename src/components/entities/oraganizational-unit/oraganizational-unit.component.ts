import { Component, Inject, Vue } from 'vue-property-decorator';
import { IOraganizationalUnit } from '../../shared/model/oraganizational-unit.model';
import AlertService from '../../shared/alert/alert.service';
import { bus } from '../../../main';
import OraganizationalUnitService from './oraganizational-unit.service';
import FilterService from '../../shared/service/filter.service';

@Component({})
export default class OraganizationalUnit extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('oraganizationalUnitService') private oraganizationalUnitService!: () => OraganizationalUnitService;
  @Inject('filterService') private filterService!: () => FilterService;

  private removeId: number = 0;
  public oraganizationalUnits: IOraganizationalUnit[] = [];
  public selectedCompanyId = 0;
  public company_id: number = 0;
  $refs!: {
    removeEntity: HTMLFormElement
  }
  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }
  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllOraganizationalUnits();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllOraganizationalUnits();
    }
  }

  public mounted(): void {
    this.retrieveAllOraganizationalUnits();
  }

  public clear(): void {
    this.retrieveAllOraganizationalUnits();
  }

  public retrieveAllOraganizationalUnits(): void {
    this.isFetching = true;
    this.oraganizationalUnitService()
      .retrieve()
      .then(
        res => {
          this.oraganizationalUnits = res.data;
          this.oraganizationalUnits = this.oraganizationalUnits.filter(element => element.company?.id === this.company_id);
          console.log(this.oraganizationalUnits);
          //   });

          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: IOraganizationalUnit): void {
    this.removeId = instance.id!;
  }

  public removeOraganizationalUnit(): void {
    this.oraganizationalUnitService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A OraganizationalUnit is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllOraganizationalUnits();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }
}
