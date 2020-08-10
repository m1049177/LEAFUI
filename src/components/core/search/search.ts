import { Component, Inject, Vue } from 'vue-property-decorator';
import { bus } from '../../../main';
import ApplicationService from '../../entities/application/application.service';
import TechnologyService from '../../entities/technology/technology.service';
import ActivityService from '../../entities/activity/activity.service';
import { IActivity } from '../../shared/model/activity.model';
import { IApplication } from '@/components/shared/model/application.model';
import { ITechnology } from '@/components/shared/model/technology.model';

@Component
export default class SearchComponent extends Vue {
  @Inject('applicationService') private applicationService!: () => ApplicationService;
  @Inject('technologyService') private technologyService!: () => TechnologyService;
  @Inject('activityService') private activityService!: () => ActivityService;

  public searchQuery: string = '';
  public applications: IApplication[] = [];
  public technologies: ITechnology[] = [];
  public businessFunctions: any[] = [];
  public activity: IActivity[] = [];

  public created() {
    bus.$on('searchQuery', (obj: any) => {
      this.searchQuery = obj;
      if (this.searchQuery !== '') {
        this.retrieveSearchResult();
      } else {
        this.$router.go(-1);
      }
    });
  }

  public mounted() {
    this.searchQuery = this.$route.params.searchQuery;
    this.retrieveSearchResult();
  }

  public retrieveSearchResult() {
    this.activityService()
      .search(this.searchQuery)
      .then(res => {
        this.activity = res.data;
      });
    this.applications = [];
    this.technologies = [];
    this.applicationService()
      .search(this.searchQuery)
      .then(response => {
        this.applications = response;
        if (this.applications.length === 0) {
          this.technologyService()
            .search(this.searchQuery)
            .then(result => {
              this.technologies = result.data;
            });
        } else {
          this.technologyService()
            .retrieve()
            .then((res: any) => {
              this.technologies = res.data;
              const technology: any[] = [];
              this.applications.forEach(app => {
                this.technologies.forEach(element => {
                  if (element.application?.id === app.id) {
                    technology.push(element);
                  }
                });
              });
              this.technologies = technology;
              console.log(this.technologies);
            });
        }
      });
  }

  public back() {
    this.$router.go(-1);
  }
}
