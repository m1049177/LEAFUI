import { Component, Vue, Inject } from 'vue-property-decorator';

import { IIssue } from '../../shared/model/issue.model';
import IssueService from './issue.service';

@Component
export default class IssueDetails extends Vue {
  @Inject('issueService') private issueService!: () => IssueService;
  public issue: IIssue = {};
  
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.issueId) {
        vm.retrieveIssue(to.params.issueId);
      }
    });
  }

  public retrieveIssue(issueId: number) {
    this.issueService()
      .find(issueId)
      .then(res => {
        this.issue = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
