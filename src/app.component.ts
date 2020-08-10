import Vue from 'vue';
import Component from 'vue-class-component';
import Ribbon from './components/core/ribbon/ribbon.vue'
import JhiFooter from './components/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from './components/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from './components/account/login-form/login-form.vue';
import Register from './components/account/register/register.vue';
import ResetPasswordInit from './components/account/reset-password/init/reset-password-init.vue';
import { bus } from './main';

@Component({
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,
    'jhi-footer': JhiFooter,
    register: Register,
    'reset-password': ResetPasswordInit
  }
})
export default class App extends Vue {
  public register = false;
  public resetPassword = false;
  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }
  public created() {
    bus.$on('register', (obj: any) => {
      this.register = obj;
    });
    bus.$on('resetPassword', (obj: any) => {
      this.resetPassword = obj;
    });
  }
}
