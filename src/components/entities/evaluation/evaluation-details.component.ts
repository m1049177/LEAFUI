import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { IEvaluation } from '../../shared/model/evaluation.model';
import EvaluationService from './evaluation.service';

@Component
export default class EvaluationDetails extends mixins(JhiDataUtils) {
  @Inject('evaluationService') private evaluationService!: () => EvaluationService;
  public evaluation: IEvaluation = {};
  public count = 0;

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.evaluationId) {
        vm.retrieveEvaluation(to.params.evaluationId);
      }
    });
  }

  public retrieveEvaluation(evaluationId: number) {
    this.evaluationService()
      .find(evaluationId)
      .then(res => {
        this.evaluation = res;
        this.evaluation.assessmentResult = JSON.parse(this.evaluation.assessmentResult);
        this.count = this.evaluation.assessmentResult.question.length;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
