import { Component, Inject, Vue } from 'vue-property-decorator';
import { ITechnology } from '../../shared/model/technology.model';
import AlertService from '../../shared/alert/alert.service';

import TechnologyService from './technology.service';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

@Component
export default class Technology extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  private removeId: number = 0;
  public technologies: ITechnology[] = [];

  $refs!: {
    removeEntity: HTMLFormElement
  }

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.retrieveAllTechnologys();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllTechnologys();
    }
  }
  public mounted(): void {
    // this.retrieveAllTechnologys();
  }

  public clear(): void {
    this.retrieveAllTechnologys();
  }

  public retrieveAllTechnologys(): void {
    this.isFetching = true;

    this.technologyService()
      .retrieve()
      .then(
        res => {
          this.technologies = res.data;
          if (this.technologies.length!== 0) {
            this.filterService()
              .TechnologyFilter(this.technologies, this.company_id)
              .then(respose => {
                this.technologies = respose;
              });
          }

          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      ).catch(err => { console.error(err) });
  }

  public prepareRemove(instance: ITechnology): void {
    this.removeId = instance.id!;
  }

  public removeTechnology(): void {
    this.technologyService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Technology is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = 0;
        this.retrieveAllTechnologys();
        this.closeDialog();
      }).catch(err => { console.error(err) });
  }

  public closeDialog(): void {
    (this.$refs.removeEntity).hide();
  }

  public previousState() {
    this.$router.go(-1);
  }
}
