import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IIssue, Issue } from '../../shared/model/issue.model';
import IssueService from './issue.service';

const validations: any = {
  issue: {
    description: {
      required
    },
    dateOfIssue: {
      required
    },
    status: {
      required
    },
    solvedDate: {
    },
    solvedBy: {},
    numberOfDays: {},
    typeOfIssue: {
      required
    },
    application : {
      required
    }
  }
};

@Component({
  validations
})
export default class IssueUpdate extends Vue {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('issueService') private issueService!: () => IssueService;
  public issue: IIssue = new Issue();

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public isSaving = false;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.issueId) {
        vm.retrieveIssue(to.params.issueId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.issue.id) {
      this.issueService()
        .update(this.issue)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Issue is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.issueService()
        .create(this.issue)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Issue is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveIssue(issueId: number): void {
    this.issueService()
      .find(issueId)
      .then(res => {
        this.issue = res;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.applicationService()
      .retrieve()
      .then(res => {
        this.applications = res.data;
      }).catch(err => { console.error(err) });
  }
}
