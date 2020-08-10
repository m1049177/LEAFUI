import { Component, Inject, Vue } from 'vue-property-decorator';
import * as joint from 'jointjs';
import IntegrationService from '@/components/entities/integration/integration.service';
import { IIntegrationData } from '@/components/shared/model/integrationData.model';
import { IntegrationFlowType } from '@/components/shared/model/integration.model';

@Component
export default class IntegrationApp extends Vue {
  @Inject('integrationService') private integrationService!: () => IntegrationService;
    public centralComponent = "";
    public heading = "Integration";
    public graph = new joint.dia.Graph;
    entityArray: any = [];
    appComponentValues: string[] = [];
    componentsLinkMap = new Map();
    componentsTextMap = new Map();
    showIntegration = false;
    show = false;
    $refs!: {
        joint: HTMLFormElement,
      }
    public jsonData: IIntegrationData = {};
    appId = 0;

    created() {
      this.appId = parseInt(this.$route.params.appId);
      console.log(this.appId);
    }

    mounted() {
      this.integrationService().getIntegrationData(this.appId).then(res => {
        this.jsonData = res;
        console.log(this.jsonData);
        for (let key of Object.keys(this.jsonData)) {
          if (key === "mainAppName") {
            this.centralComponent = this.jsonData[key]
          } else if (key === "links") {
            this.showIntegration = true;
            this.jsonData[key].forEach(element => {
              this.appComponentValues.push(element.appName)
              this.componentsLinkMap.set(element.appName, element.flowType)
              this.componentsTextMap.set(element.appName, element.entity)
            });
          }
        }
        this.createBoxes();
      })

    }
    createBoxes() {
        let paper = new joint.dia.Paper({
            el: document.getElementById('myholder'),
            width: '100%',
            height: '100vh',
            model: this.graph,
            gridSize: 10,
            drawGrid: true,
            // background: {
            //   color: 'rgba(0, 255, 0, 0.3)'
              
            // }
          });
      
          let xx = 350;
          let yy = 160;
          let i, j;
          let elementCounter = 0;
      
          let boxText: any;
          let element: any;
          //creating outer box(ParenT)
          let el = new joint.shapes.standard.Rectangle();
          el.position(300,70);
          el.resize(800, 500);
          el.attr({
            body: {
              rx: 2,
              ry: 2,
              fill: 'white',
              stroke: 'black',
              strokeWidth: 1.5
            },
            label: {
              fontSize: 28,
              fill: 'red'
            }
          });
      
          el.attr({
            label: {
              text: this.heading,
              fontWeight: 'bold',
              'ref-y': '-42%',
              'ref-x': '1%'
            }
          });
      
          el.addTo(this.graph)
        //  creating child boxes
          for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
              if (i === j && ((i + j) / 2) === 1) {
                boxText = this.centralComponent;
                elementCounter--;
                element = this.centralComponent;
                xx = 630;
                yy = 310;
      
              } else {
                boxText = this.appComponentValues[elementCounter];
                element = this.appComponentValues[elementCounter];
              }
              // this.entityArray[element] = new joint.shapes.basic.Rect({
              //   position: { x: xx, y: yy },
              //   size: { width: 150, height: 60 },
              //   attrs: {
              //     rect: { fill: '#2C3E50' }, text: {
              //       text: boxText, fill: '#3498DB', fontSize: 18,
              //       fontWeight: 'bold'
              //     }
              //   }
              // });
              // console.log("---"+this.appComponentValues);
          
              if (this.appComponentValues[elementCounter] === undefined) {
                  continue;
              }
              this.entityArray[element] = new joint.shapes.standard.Rectangle({
                position: { x: xx, y: yy },
                size: { width: 165, height: 60 }
              });
      
              this.entityArray[element].attr({
                body: {
                  fill: '#2C3E50',
                  filter: {
                    name: 'dropShadow',
                    args: {
                      dx: 2,
                      dy: 2,
                      blur: 2
                    }
                  }
                },
                label: {
                  text: boxText,
                  fontSize: 14,
                  fill: '#3498DB',
                  fontWeight: 'bold'
                }
              });
              // boxArray[keys[keyArrayCounter]].embed(rect[element.componentName]);
              //     graph.addCell(rect[element.componentName]);
      
              el.embed(this.entityArray[element])
              this.graph.addCell(this.entityArray[element])
              //this.entityArray[this.eightComponentsValues[elementCounter]].addTo(this.graph);
              if (boxText === this.centralComponent) {
                el.embed(this.entityArray[element])
                this.graph.addCell(this.entityArray[boxText])
                //this.entityArray[boxText].addTo(this.graph);
              }
              xx = xx + 280;
              elementCounter++;
            }
            yy = yy + 150;
            xx = 350;
          }
          this.componentsLinkMap.forEach((value: string, key: string) => {
            if (value === IntegrationFlowType.INBOUND) {
              let link = new joint.shapes.standard.Link();
              link.source(this.entityArray[key]);
              link.target(this.entityArray[this.centralComponent]);
              link.labels([{
                attrs: {
                  text: {
                    text: this.componentsTextMap.get(key),
                    fill: '#8b0000',
                    fontWeight: 'bold'
                  }
                }
              }]);
              link.addTo(this.graph);
      
            } else if (value === IntegrationFlowType.OUTBOUND) {
              let link = new joint.shapes.standard.Link();
              link.source(this.entityArray[this.centralComponent]);
              link.target(this.entityArray[key]);
              link.labels([{
                attrs: {
                  text: {
                    text: this.componentsTextMap.get(key),
                    fill: '#8b0000',
                    fontWeight: 'bold'
                  }
                }
              }]);
              link.addTo(this.graph);
      
            } else {
              let link = new joint.shapes.standard.Link();
              link.source(this.entityArray[this.centralComponent]);
              link.target(this.entityArray[key]);
      
              link.attr({
                line: {
                  stroke: 'black',
                  strokeWidth: 1,
                  sourceMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'black',
                    'd': 'M 10 -5 0 0 10 5 Z'
                  },
                  targetMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'black',
                    'd': 'M 10 -5 0 0 10 5 Z'
                  }
                }
              });
              link.labels([{
                attrs: {
                  text: {
                    text: this.componentsTextMap.get(key),
                    fill: '#8b0000',
                    fontWeight: 'bold'
                  }
                }
              }]);
              link.addTo(this.graph);
            }
          });
         //paper.scaleContentToFit({ padding: 100 });
    }
    close() {
      console.log("inside close")
      this.$router.go(-1);
    }
}
