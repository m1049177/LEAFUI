<template>
    <div id="chart">
         <b-button v-if='showDelete' class='chartBtn' v-on:click='removeFunction()' variant="danger">Delete</b-button>
        <b-modal id="deleteModal">Deleted Successfully</b-modal>

        <b-modal id="errorModal">Cannot Delete this node. Foreign key constraints!</b-modal>

        <ejs-diagram id="diagram" :width='width' :height='height'
            v-on:click='clicked($event)'
            :snapSettings='snapSettings'
            :getNodeDefaults='getNodeDefaults'
            :getConnectorDefaults='getConnectorDefaults' 
            :layout='layout' 
            :dataSourceSettings='dataSourceSettings' >
        </ejs-diagram>
    </div>
</template>
<script>
    // import Vue from 'vue';
    import axios from 'axios';
    import Vue from 'vue';
    import { DiagramPlugin, HierarchicalTree, DataBinding,NodeConstraints} from '@syncfusion/ej2-vue-diagrams';
    import {SnapSettingsModel,SnapConstraints,Snapping, Diagram } from '@syncfusion/ej2-vue-diagrams';
    import { DataManager } from "@syncfusion/ej2-data";
    import { bus } from '../../../main';
    Vue.use(DiagramPlugin);
    export default {
        name: 'app',
        data() {
            return {
                width: "95%",
                height: "350px",
                chartData : [],
                showDelete : false,
                deleteId : 0,
                company_id : 0,
                deleteType: '',
                snapSettings: {
                    constraints:  {
                        show : false
                    }
                    //SnapConstraints.HideLines  
                },
                getNodeDefaults: node => {
                    node.height = 60;
                    node.width = 100;
                    switch (node.data.title) {
                        case "line-of-businesses":
                            node.style = { fill: '#f2d267', strokeColor: 'white' };
                            break;
                        case "applications":
                            node.style = { fill: '#d4647a', strokeColor: 'white' };
                            break;                                                    
                        default:
                            node.style = { fill: '#56c0f0', strokeColor: 'white' };
                            break;
                    }
                    node.constraints = node.constraints & ~(NodeConstraints.Delete);
                    return node;
                },
                getConnectorDefaults: obj => {
                    obj.type = 'Orthogonal';
                    return obj;
                },
                layout: {
                    type: "OrganizationalChart",
                    getLayoutInfo: function(node, options) {
                        node.layoutInfo.children = options.children;
                        // console.log(options);
                        if (!options.hasSubTree) {
                            options.orientation = 'Vertical';
                            options.type = 'Alternate';
                        }
                    }
                },
                dataSourceSettings: {},

            }
        },
        provide: {diagram: [DataBinding, HierarchicalTree]},
        created() {
            bus.$on('CompanyChange', obj => {
                // console.log(obj);
                if(obj === "") {
                    this.company_id = parseInt(localStorage.getItem('CompanyId'))
                    axios.get(`api/getAppChartData/${this.company_id}`).then(res => {
                        // console.log(res.data);
                        this.dataSourceSettings = {
                            id: 'trackingId', 
                            parentId: 'parentId',
                            dataManager: new DataManager(res.data),
                            doBinding: (nodeModel, localdata, diagram) => {
                                nodeModel.shape = {
                                    type: "Text",
                                    content: (localdata).name,
                        }
                    }
                }
            })
                } else {
                    this.company_id = parseInt(obj);
                axios.get(`api/getAppChartData/${this.company_id}`).then(res => {
                this.dataSourceSettings = {
                    id: 'trackingId', 
                    parentId: 'parentId',
                    dataManager: new DataManager(res.data),
                    doBinding: (nodeModel, localdata, diagram) => {
                        nodeModel.shape = {
                            type: "Text",
                            content: (localdata).name,
                        }
                    }
                }
            })
                }
            });
            
            console.log(localStorage.getItem('CompanyId'));
        },
        methods: {
            clicked(args) {
                this.showDelete = false;
                this.deleteId = 0;
                this.deleteType = '';
                // console.log(args);
                if(args.element.layoutInfo.children.length === 0) {
                    this.showDelete = true;
                    this.deleteId = args.element.data.id;
                    this.deleteType = args.element.data.title;
                } 
                if(args.element.data.title === 'applications') {
                const appDetails = {
                    id : args.element.data.id,
                    name : args.element.data.name,
                }
                bus.$emit('appDetails', appDetails);
                } else {
                    const appDetails = {
                    id : 0,
                    name : '',
                }
                 bus.$emit('appDetails', appDetails);
            }
            },
            removeFunction() {
                axios.delete(`api/${this.deleteType}/${this.deleteId}`).then(res => {
                    console.log("deleted");
                    this.dismissCountDown = this.dismissSecs;
                    this.showDelete = false;
                    this.deleteId = 0;
                    this.deleteType = '';
                }).catch(err => {
                    this.$root.$emit('bv::show::modal', 'errorModal');
                })
            },

        }
    }
</script>
<style>
    @import "./ejs-diagram.css";

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #888888; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdbaba;
  box-shadow: inset 0 0 5px #888888; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #bdbaba; 
}
#diagram {
    margin: 15px 10px;
    border: 2px solid black;
}
.chartBtn {
    width: 15%;
    float: right ;
    margin: 10px;
    border-radius: 22px;
}
#appdiagram {
    margin: 15px 10px;
    border: 2px solid black;
}
</style>