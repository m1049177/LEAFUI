import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';

import { IDiagram } from '../../shared/model/diagram.model';
import DiagramService from './diagram.service';

@Component
export default class DiagramDetails extends mixins(JhiDataUtils) {
  @Inject('diagramService') private diagramService!: () => DiagramService;
  public diagram: IDiagram = {};

  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      if (to.params.diagramId) {
        vm.retrieveDiagram(to.params.diagramId);
      }
    });
  }

  public retrieveDiagram(diagramId: number) {
    this.diagramService()
      .find(diagramId)
      .then(res => {
        this.diagram = res;
      }).catch(err => { console.error(err) });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
