import { Component, Vue } from 'vue-property-decorator';
@Component
export default class SideNavBar extends Vue {
  public sideNavWidth = 56;
  public increase() {
    this.sideNavWidth = 240;
  }
  public decrease() {
    this.sideNavWidth = 56;
  }
  public navigateFunction(label: string) {
    console.log('inside' + label);
    this.$router.push({ name: label });
  }
}
