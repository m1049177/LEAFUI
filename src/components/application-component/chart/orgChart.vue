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
    import { alertService } from '../../shared/alert/alert.service';

    import Vue from 'vue';
    import { DiagramPlugin, HierarchicalTree, DataBinding,NodeConstraints} from '@syncfusion/ej2-vue-diagrams';
    import {SnapSettingsModel,SnapConstraints,Snapping, Diagram } from '@syncfusion/ej2-vue-diagrams';
    import { DataManager } from "@syncfusion/ej2-data";
    import { bus } from '../../../main';
    Vue.use(DiagramPlugin);
    export default {
        name: 'app',
        components: {
            alertService,
        },
        data() {
            return {
                width: "100%",
                height: "650px",
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
                        case "Company":
                            node.style = { fill: '#e5a2e5', strokeColor: 'white' };
                            break;
                        case "oraganizational-units":
                            node.style = { fill: '#66d7d3', strokeColor: 'white' };
                            break;
                        case "line-of-businesses":
                            node.style = { fill: '#f2d267', strokeColor: 'white' };
                            break;
                        case "business-functions":
                            node.style = { fill: '#67bd7f', strokeColor: 'white' };
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
        props: ['CompanyId'],
        watch: {
            CompanyId: function(newVal, oldVal) {
                console.log(newVal,oldVal);
                axios.get(`api/getChartData/${newVal}`).then(res => {
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
        },
        created() {
            axios.get(`api/getChartData/${this.CompanyId}`).then(res => {
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