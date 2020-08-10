import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import LoginService from '../../account/login.service';

@Component
export default class Error extends Vue {
  @Inject('loginService')
  private loginService!: () => LoginService;
  errorMessage: string = "";
  error403 = false;
  error404 = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      let errorMessage = "";
      let error403 = false;
      let error404 = false;

      if (to.meta.errorMessage) {
        errorMessage = to.meta.errorMessage;
      }

      if (to.meta.error403) {
        error403 = to.meta.error403;
      }

      if (to.meta.error404) {
        error404 = to.meta.error404;
      }

      vm.init(errorMessage, error403, error404);
    });
  }

  public init(errorMessage: string = "", error403 = false, error404 = false) {
    this.errorMessage = errorMessage;
    this.error403 = error403;
    this.error404 = error404;

    if (!this.$store.getters.authenticated && this.error403) {
      this.loginService().openLogin(this.$root);
    }
  }
}
