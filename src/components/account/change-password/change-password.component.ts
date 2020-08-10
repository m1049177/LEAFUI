import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';
import { mapGetters } from 'vuex';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';

const validations = {
  resetPassword: {
    currentPassword: {
      required
    },
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
  validations,
  computed: {
    ...mapGetters(['account'])
  }
})
export default class ChangePassword extends Vue {
  success: string = "";
  error: string = "";
  doNotMatch: string = "";
  resetPassword: any = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  public changePassword(): void {
    if (this.resetPassword.newPassword !== this.resetPassword.confirmPassword) {
      this.error = "";
      this.success = "";
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = "";
      axios
        .post('api/account/change-password', {
          currentPassword: this.resetPassword.currentPassword,
          newPassword: this.resetPassword.newPassword
        })
        .then(() => {
          this.success = 'OK';
          this.error = "";
        })
        .catch(() => {
          this.success = "";
          this.error = 'ERROR';
        });
    }
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
