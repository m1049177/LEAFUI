import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import AccountService from '../account.service';
import Register from '../register/register.component';
import ResetPasswordInit from '../reset-password/init/reset-password-init.component';
import { bus } from '../../../main';

@Component({
  components: {
    register: Register,
    resetPassword: ResetPasswordInit
  },
  watch: {
    $route() {
      this.$root.$emit('bv::hide::modal', 'login-page');
    }
  }
})
export default class LoginForm extends Vue {
  @Inject('accountService')
  private accountService!: () => AccountService;
  public authenticationError?: boolean = false;
  public login: any = null;
  public password: any = null;
  public rememberMe: boolean = false;
  public register = false;

  public created() {
    console.log(process.env.VUE_APP_SERVER_API_URL);
  }
  public doLogin(): void {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        //console.log(result);
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        this.$root.$emit('bv::hide::modal', 'login-page');
        this.accountService().retrieveAccount();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  navigateFunction(page: string) {
    if (page === 'Register') {
      bus.$emit('register', true);
    } else {
      bus.$emit('resetPassword', true);
    }
  }
}
