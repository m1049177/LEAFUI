import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { IAssessment } from '../../shared/model/assessment.model';
import AssessmentService from './assessment.service';

@Component
export default class AssessmentDetails extends mixins(JhiDataUtils) {
  @Inject('assessmentService') private assessmentService!: () => AssessmentService;
  public assessment: IAssessment = {};
  public question: string[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.assessmentId) {
        vm.retrieveAssessment(to.params.assessmentId);
      }
    });
  }

  public retrieveAssessment(assessmentId: number) {
    this.assessmentService()
      .find(assessmentId)
      .then(res => {
        this.assessment = res;
        this.assessment.questions = JSON.parse(this.assessment.questions);
        this.question = this.assessment.questions.question;
        console.log(this.assessment);
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
