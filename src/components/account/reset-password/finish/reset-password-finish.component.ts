import axios from 'axios';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { Inject, Vue, Component } from 'vue-property-decorator';
import LoginService from '../../login.service';

const validations = {
  resetAccount: {
    newPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    },
    confirmPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations
})
export default class ResetPasswordFinish extends Vue {
  @Inject('loginService')
  private loginService!: () => LoginService;

  public doNotMatch: string = '';
  public success: string = '';
  public error: string = '';
  public keyMissing?: boolean ;
  public key: any;
  public resetAccount: any = {
    newPassword: null,
    confirmPassword: null
  };

  created(): void {
    if (this.$route !== undefined && this.$route.query !== undefined && this.$route.query.key !== undefined) {
      this.key = this.$route.query.key;
    }
    this.keyMissing = !this.key;
  }

  public finishReset(): void {
    this.doNotMatch = '';
    this.success = '';
    this.error = '';
    if (this.resetAccount.newPassword !== this.resetAccount.confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      axios
        .post('api/account/reset-password/finish', { key: this.key, newPassword: this.resetAccount.newPassword })
        .then(() => {
          this.success = 'OK';
        })
        .catch(() => {
          this.success = '';
          this.error = 'ERROR';
        });
    }
  }

  public openLogin() {
    this.loginService().openLogin(this.$root);
  }
}
