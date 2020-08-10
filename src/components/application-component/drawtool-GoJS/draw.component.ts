import { Component, Inject, Vue } from 'vue-property-decorator';
import { bus } from '@/main';
import DiagramService from '@/components/entities/diagram/diagram.service';
import { IDiagram } from '@/components/shared/model/diagram.model';

@Component
export default class Draw extends Vue {
public company_id = 0;
public show = false;
public diagramData: IDiagram[] = [];

@Inject('diagramService') private diagramService!: () => DiagramService;
public created() {
    console.log("insidde created");
    bus.$on('CompanyChange', (obj: any) => {
        this.company_id = obj;
    });
    if(this.company_id === 0) {
        this.company_id = parseInt(localStorage.getItem('CompanyId')!);
    }
    this.diagramService().retrieve().then(res => {
        this.diagramData = res.data;
        this.show = true;
        this.diagramData = this.diagramData.filter(element => element.company?.id === this.company_id);
        })
}
public loadDiagramData() {

}
public byteSize(base64String: string) {
    return this.formatAsBytes(this.size(base64String));
}
public size(value: any) {
    return (value.length / 4) * 3 - this.paddingSize(value);
}
public endsWith(suffix: any, str: any) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
public paddingSize(value: any) {
  if (this.endsWith('==', value)) {
    return 2;
  }
  if (this.endsWith('=', value)) {
    return 1;
  }
  return 0;
}
public formatAsBytes(size: any) {
  return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
}

public download(data: any) {
    const a=document.createElement("a");
    a.setAttribute('href', data);
    a.setAttribute('download', '');
    a.setAttribute('target', '_blank');
    a.click();
 }

public remove(id: number) {
    this.diagramService().delete(id).then((res: any) => {
      this.diagramData = this.diagramData.filter(item => item?.id!== id);
    }).catch(function(error) { console.log(error); })
}
}
