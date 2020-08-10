import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ApplicationService from '../application/application.service';
import { IApplication } from '../../shared/model/application.model';

import AlertService from '../../shared/alert/alert.service';
import { IEvaluation, Evaluation, EvaluationResult } from '../../shared/model/evaluation.model';
import EvaluationService from './evaluation.service';
import AssessmentService from '../assessment/assessment.service';
import { IAssessment } from '../../shared/model/assessment.model';
import FilterService from '../../shared/service/filter.service';
import { bus } from '../../../main';

const validations: any = {
  evaluation: {
    attemptDate: {},
    assessmentCategory: {
      required
    },
    score: {},
    assessmentResult: {},
    application: {
      required
    }
  },
  evaluationOutput: {
    result: {
      required
    }
  }
};

@Component({
  validations
})
export default class EvaluationUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService!: () => AlertService;
  @Inject('evaluationService') private evaluationService!: () => EvaluationService;
  @Inject('assessmentService') private assessmentService!: () => AssessmentService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public evaluation: IEvaluation = new Evaluation();

  @Inject('applicationService') private applicationService!: () => ApplicationService;

  public applications: IApplication[] = [];
  public assessments: IAssessment[] = [];
  public isSaving = false;
  public options: string[] = [];
  public evaluationOutput: EvaluationResult[] = [];
  public check = false;
  public questCount = 0;
  public score = 0;
  public totalQuestion = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.evaluationId) {
        vm.retrieveEvaluation(to.params.evaluationId);
      }
    });
  }

  public created(): void {
    bus.$on('CompanyChange', (obj: any) => {
      this.company_id = obj;
      this.initRelationships();
      this.retrieveAssessment();
    });
    if (this.company_id === 0) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.initRelationships();
      this.retrieveAssessment();
    }
  }

  public mounted() {
    this.options = ['To be Done', 'In Progress', 'Taken Care', 'Not Applicable'];
  }
  public save(): void {
    this.isSaving = true;
    // create json for assessment_result combining questions and answers
    this.evaluationOutput.forEach(element => {
      if (element.category === this.evaluation.assessmentCategory) {
        this.questCount = element.question?.length!;
        this.evaluation.assessmentResult = {
          question: element.question,
          result: element.result,
          description: element.description
        };
      }
    });
    //// To find any unanswered questions
    for (let i = 0; i < this.questCount; i++) {
      if (this.evaluation.assessmentResult.result[i] === undefined) {
        this.check = true;
      } else {
        if (this.evaluation.assessmentResult.result[i] === 'To be Done') {
          this.totalQuestion = this.totalQuestion + 1;
          this.score = this.score + 0;
        } else if (this.evaluation.assessmentResult.result[i] === 'In Progress') {
          this.totalQuestion = this.totalQuestion + 1;
          this.score = this.score + 1;
        } else if (this.evaluation.assessmentResult.result[i] === 'Taken Care') {
          this.totalQuestion = this.totalQuestion + 1;
          this.score = this.score + 2;
        }
      }
    }
    this.evaluation.score = (this.score / (this.totalQuestion * 2)) * 100;
    this.evaluation.attemptDate = new Date();
    this.evaluation.assessmentResult = JSON.stringify(this.evaluation.assessmentResult);
    // console.log(this.evaluation);
    if (!this.check) {
      if (this.evaluation.id) {
        this.evaluationService()
          .update(this.evaluation)
          .then(param => {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Evaluation is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }).catch(err => { console.error(err) });
      } else {
        this.evaluationService()
          .create(this.evaluation)
          .then(param => {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Evaluation is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }).catch(err => { console.error(err) });
      }
    } else {
      this.$router.go(-1);
      const message = 'Please Check if You have answered all question. And your assessment is not considered.';
      this.alertService().showAlert(message, 'danger');
    }
  }

  public retrieveEvaluation(evaluationId: number): void {
    this.evaluationService()
      .find(evaluationId)
      .then(res => {
        this.evaluation = res;
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
        if (this.applications.length!== 0) {
          this.filterService()
            .ApplicationFilter(this.applications, this.company_id)
            .then(res1 => {
              this.applications = res1;
            });
        }
      }).catch(err => { console.error(err) });
  }

  public retrieveAssessment() {
    this.assessmentService()
      .retrieve()
      .then(res => {
        this.assessments = res.data;
        this.assessments = this.assessments.filter(element => (element.questions = JSON.parse(element.questions)));
        console.log(this.assessments);
        this.assessments.forEach(item => {
          this.evaluationOutput.push({
            category: item.assessmentCategory,
            question: item.questions.question,
            result: new Array(item.questions.question.length),
            description: new Array(item.questions.question.length)
          });
        });
      }).catch(err => { console.error(err) });
  }

  public checkRadio(value: string) {
    console.log('inside check');
    if (value === ' ' || value === null) {
      return false;
    } else {
      return true;
    }
  }
}
