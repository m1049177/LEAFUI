import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';
import { EMAIL_ALREADY_USED_TYPE } from '../../../constants';
import { Vue, Component, Inject } from 'vue-property-decorator';

const validations = {
  settingsAccount: {
    firstName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    lastName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email,
      minLength: minLength(5),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations
})
export default class Settings extends Vue {
  public success: string = '';
  public error: string = '';
  public errorEmailExists: string = '';
  public languages: any = this.$store.getters.languages || [];

  public save(): void {
    this.error = '';
    this.errorEmailExists = '';
    axios
      .post('api/account', this.settingsAccount)
      .then(() => {
        this.error = '';
        this.success = 'OK';
        this.errorEmailExists = '';
      })
      .catch(error => {
        this.success = '';
        this.error = 'ERROR';
        if (error.response.status === 400 && error.response.data.type === EMAIL_ALREADY_USED_TYPE) {
          this.errorEmailExists = 'ERROR';
          this.error = '';
        }
      });
  }

  public get settingsAccount(): any {
    return this.$store.getters.account;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
