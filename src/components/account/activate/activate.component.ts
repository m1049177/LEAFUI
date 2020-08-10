import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import LoginService from '../login.service';
import ActivateService from './activate.service';

@Component
export default class Activate extends Vue {
  @Inject('activateService') private activateService!: () => ActivateService;
  @Inject('loginService') private loginService!: () => LoginService;
  success = false;
  error = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.query.key) {
        vm.init(to.query.key);
      }
    });
  }

  public init(key: string): void {
    this.activateService()
      .activateAccount(key)
      .then(
        res => {
          this.success = true;
          this.error = false;
        },
        err => {
          this.error = true;
          this.success = false;
        }
      );
  }

  public openLogin(): void {
    this.loginService().openLogin(this.$root);
  }
}
