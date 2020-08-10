import { Component, Inject, Vue } from 'vue-property-decorator';
import UserManagementService from './user-management.service';
import AlertService from '../../shared/alert/alert.service';

@Component
export default class JhiUserManagementComponent extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('userService') private userManagementService!: () => UserManagementService;
  public error = '';
  public success = '';
  public users: any[] = [];
  public itemsPerPage = 20;
  public queryCount?: number;
  public page = 1;
  public previousPage?: number;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public removeId?: number;

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

  public mounted(): void {
    this.loadAll();
  }

  public setActive(user: any, isActivated: any): void {
    user.activated = isActivated;
    this.userManagementService()
      .update(user)
      .then(() => {
        this.error = '';
        this.success = 'OK';
        this.loadAll();
      })
      .catch(() => {
        this.success = '';
        this.error = 'ERROR';
        user.activated = false;
      });
  }

  public loadAll(): void {
    this.userManagementService()
      .retrieve({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .then(res => {
        this.users = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
        this.queryCount = this.totalItems;
      }).catch(err => { console.error(err); })
  }

  public sort(): any {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.loadAll();
  }

  public changeOrder(propOrder: string): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public deleteUser(): void {
    this.userManagementService()
      .remove(this.removeId!)
      .then(res => {
        const message = res.headers['x-leafclient3app-alert'];
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = 0;
        this.loadAll();
      }).catch(err => { console.error(err); })
  }

  public prepareRemove(instance: any): void {
    this.removeId = instance.login;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
