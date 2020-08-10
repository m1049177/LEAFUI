import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';
import { EMAIL_NOT_FOUND_TYPE } from '../../../../constants';
import { Vue, Component } from 'vue-property-decorator';
import { bus } from '../../../../main';

const validations = {
  resetAccount: {
    email: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(254),
      email
    }
  }
};

interface ResetAccount {
  email: string;
}

@Component({
  validations
})
export default class ResetPasswordInit extends Vue {
  public success?: boolean;
  public error: string = '';
  public errorEmailNotExists: string = '';
  public resetAccount: ResetAccount = {
    email: ''
  };
  public created() {
    //console.log('inside reset');
  }
  public requestReset(): void {
    this.errorEmailNotExists = '';
    this.error = '';
    axios
      .post('api/account/reset-password/init', this.resetAccount.email, {
        headers: {
          'content-type': 'text/plain'
        }
      })
      .then(() => {
        this.success = true;
      })
      .catch(error => {
        this.success = false;
        if (error.response.status === 400 && error.response.data.type === EMAIL_NOT_FOUND_TYPE) {
          this.errorEmailNotExists = 'ERROR';
        } else {
          this.error = 'ERROR';
        }
      });
  }
  public back() {
    bus.$emit('resetPassword', false);
  }
}
