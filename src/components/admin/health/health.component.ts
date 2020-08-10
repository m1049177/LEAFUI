import HealthService from './health.service';
import JhiHealthModal from './health-modal.vue';
import { Component, Inject, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'health-modal': JhiHealthModal
  }
})
export default class JhiHealth extends Vue {
  public healthData: any = null;
  public currentHealth: any = null;
  public updatingHealth = false;
  @Inject('healthService') private healthService!: () => HealthService;

  $refs!: {
    healthModal: HTMLFormElement
  }
  public mounted(): void {
    this.refresh();
  }

  public baseName(name: any): any {
    return this.healthService().getBaseName(name);
  }

  public getBadgeClass(statusState: any): string {
    if (statusState === 'UP') {
      return 'badge-success';
    } else {
      return 'badge-danger';
    }
  }

  public refresh(): void {
    this.updatingHealth = true;
    this.healthService()
      .checkHealth()
      .then(res => {
        this.healthData = this.healthService().transformHealthData(res.data);
        // this.healthData = res.data
        this.updatingHealth = false;
      })
      .catch(error => {
        if (error.status === 503) {
        //  this.healthData = error.error;
         this.healthData = this.healthService().transformHealthData(error.error);
        }
        this.updatingHealth = false;
      });
  }

  public showHealth(health: any): void {
    this.currentHealth = health;
    (this.$refs.healthModal).show();
  }

  public subSystemName(name: string) {
    return this.healthService().getSubSystemName(name);
  }
}