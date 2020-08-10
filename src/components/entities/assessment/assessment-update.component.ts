import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '../../shared/alert/alert.service';
import { IAssessment, Assessment } from '../../shared/model/assessment.model';
import AssessmentService from './assessment.service';

const validations: any = {
  assessment: {
    assessmentCategory: {
      required
    }
  }
};

@Component({
  validations
})
export default class AssessmentUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('assessmentService') private assessmentService!: () => AssessmentService;
  public assessment: IAssessment = new Assessment();
  public isSaving = false;
  public questCount = 0;
  public data: any[] = [];

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.assessmentId) {
        vm.retrieveAssessment(to.params.assessmentId);
      }
    });
  }

  public mounted(): void {
    this.assessment.questions = {
      question: []
    };
  }

  public save(): void {
    this.assessment.questions = JSON.stringify(this.assessment.questions);
    this.questCount = 0;
    this.isSaving = true;
    if (this.assessment.id) {
      this.assessmentService()
        .update(this.assessment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Assessment is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        }).catch(err => { console.error(err) });
    } else {
      this.assessmentService()
        .create(this.assessment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Assessment is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        }).catch(err => { console.error(err) });
    }
  }

  public retrieveAssessment(assessmentId: number): void {
    this.assessmentService()
      .find(assessmentId)
      .then(res => {
        this.assessment = res;
        this.assessment.questions = JSON.parse(this.assessment.questions);
        this.questCount = this.assessment.questions.question.length;
      }).catch(err => { console.error(err) });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  public deleteQuestion(indexNo: number) {
    this.assessment.questions.question = this.assessment.questions.question.filter(
      (element: any) => this.assessment.questions.question.indexOf(element) !== indexNo
    );
    this.questCount = this.assessment.questions.question.length;
  }

  public AddQuestion() {
    this.questCount++;
  }
}
