import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { ILabel } from '../../shared/model/label.model';
import LabelService from './label.service';

@Component
export default class LabelDetails extends mixins(JhiDataUtils) {
  @Inject('labelService') private labelService!: () => LabelService;
  public label: ILabel = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
      }
    });
  }

  public retrieveLabel(labelId: number) {
    this.labelService()
      .find(labelId)
      .then(res => {
        this.label = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
