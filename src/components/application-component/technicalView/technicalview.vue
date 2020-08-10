<template>
    <div>
        <h2> 
            <font-awesome-icon style='height:25px;width:20px;margin-left:3px;' icon="cogs" /> 
            Technical View
        </h2>

    <b-row>
        <b-col cols=3 class='sideNav'>
            <b-row>
                <router-link :to="{name: 'AddBucket',params:{ addString:'bucket'}}" tag="button" class='dynamicbtn' style='width: 100%;margin: 10px;' >
                 <font-awesome-icon icon="plus" />
                 <span>Add new bucket</span>
             </router-link>
             </b-row>
        <div class='bucket' v-for='(labelData,index) in label.label_data' :key='labelData.id'>
                <b-card class='highLightCard'
                v-on:click="navigateFunction(labelData.name)"
                >
                   <font-awesome-icon icon="server" />
                    <span class='CardHeading'>{{labelData.label_id}}</span>
                      <b-row>
                        <b-col cols=8>Total Technology</b-col>
                        <b-col style='padding:0px;' cols=4>
                        <svg width="50" height="50">
                            <circle cx="22" cy="25" r="20" stroke="black" stroke-width="1" fill=" #e196ae" />
                            <text fill="#17a2b8;" font-size="13" font-weight="500" font-family="Verdana" x="14" y="28" >{{totalCount[index]}}</text>
                    </svg></b-col>
                </b-row>
                </b-card>
                 </div>
            </b-col>
   
    <b-col cols=9>
        <b-row>
             <b-col cols=6> 
                 <b-card style='padding:8px;' class='applicationCard'>
                    <b-row>
                        <b-col sm=12 md=12 lg=6>
                        <h5 style='color:#313d53;'>Technology Alert</h5>
                        </b-col>
                        <b-col sm=12 md=12 lg=6>
                            <router-link :to="{name: 'TechnologySuggestionsCreate'}" tag="button" class='dynamicbtn' style='width: 100%;margin: 10px;' >
                                <font-awesome-icon icon="plus" />
                                <span>Add new Suggestions</span>
                            </router-link>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm=12 md=12 lg=6>
                            <div class="applicationDiv">Total Application Count Under Risk - 
                                <b-badge variant="danger">{{riskApplication}}</b-badge></div>
                        </b-col>
                        <b-col sm=12 md=12 lg=6>
                            <div class="applicationDiv">Updation Needed Application Count-
                            <b-badge variant="success">{{stableApplication}}</b-badge></div>
                        </b-col>
                    </b-row>
                    
                </b-card>
                <b-card class='DynamicContent'>
                    <b-card-header>
                        <div v-for='labelData in label.label_data' :key='labelData.id'>
                        <b-row v-if='labelData.name === selectedBucket'>
                        <b-col cols=10>
                            <b-form-input v-bind:id = labelData.label_id
                                @change='labelChange()'
                                style='background-color:white;
                                font-size:23px;border:none;font-weight:bold;color:#313d53'
                                type='text' v-model='labelData.label_id'/></b-col>
                            <b-col cols=2 style='padding-top:10px;'>
                            <span><font-awesome-icon 
                            style='height:24px;width:24px;color:#313d53;' @click='labelEdit(labelData.label_id)' icon="pencil-alt" /></span></b-col>
                            </b-row>
                        </div>
                        <b-row>
                        <div style='float:right;' v-for='countData in suggestion' :key='countData.id'>  
                            <b-button v-if="countData.type == selectedBucket && countData.risk !== 0" class='riskbtn' 
                            @click="Suggestion(selectedBucket,'RISK')" variant="danger">
                            Risk <b-badge variant="light">{{countData.risk}}</b-badge>
                            </b-button>
                             <b-button v-if="countData.type == selectedBucket && countData.stable !== 0" class='stablebtn' 
                             @click="Suggestion(selectedBucket,'STABLE')" variant="success">
                            Stable <b-badge variant="light">{{countData.stable}}</b-badge>
                            </b-button></div></b-row>
                    </b-card-header>
                        <b-row>
                            <b-col lg=6 md=12>
                                <router-link :to="{name: 'TechnologyCreate'}" tag="button" class='dynamicbtn' >
                                    <font-awesome-icon icon="plus" />
                                    <span>Add new application</span>
                            </router-link>
                            </b-col><b-col lg=6 md=12>
                                <router-link :to="{name: 'Technology'}" tag="button" class='dynamicbtn' >
                                    <font-awesome-icon icon="eye" />
                                    <span>View all application</span>
                            </router-link>
                            </b-col>
                            </b-row>
                    <div class="overflow-auto" style='margin-top:20px'>
                    <b-table
                        id="my-table"
                        striped
                        hover
                        :fields="fields"
                        :items="technologyData"
                        :per-page="perPage"
                        :current-page="currentPage"
                        large></b-table>
                    <b-card-footer>
                        <b-pagination pills v-if="technologyData.length>5"
                        v-model="currentPage"
                        :limit="2"
                        :total-rows="technologyData.length"
                        :per-page="perPage"
                        aria-controls="my-table"
                        ></b-pagination>
                    </b-card-footer>
                </div>
            </b-card></b-col>
             <b-col cols=6>
                <div class='info'>
                    <div>
                    <font-awesome-icon icon="cloud-upload-alt" />
                     <span class='CardHeading'>Information</span></div>
                     <div>Provides information about current, latest and outdated version of technologies</div>
                    <b-form-group style="margin-top:10px;">       
                        <b-form-radio-group
                            id="radio-group-1"
                            v-model='modalBucket'
                            :options="technologyType"
                            name="radio-options"
                            ></b-form-radio-group>
                        </b-form-group>
                    <div>
                        <b-button @click="showModal()" class='infobtn' :disabled="modalBucket == ''">Know More</b-button>
                        <router-link :to="{name: 'TechnologyRecommendationCreate'}" tag="button" class='dynamicbtn' style='float:right;' >
                            <font-awesome-icon icon="plus" />
                            <span>Add Recommendations</span>
                        </router-link>
                    </div>
                </div>
                 <div id="chart">
                    <h5 class='CardHeading'>Technology Graph</h5>
                    <apexchart type=bar height=450 :options="chartOptions" :series="chartSeries" />
                   
                </div>
             </b-col>
        </b-row>
    </b-col>
   </b-row>
   
   <!-- Modal form technology Recommendation -->

        <b-modal id="upgradation" size='lg' hide-header hide-footer>
            <h6 class='header'>{{modalBucket}} Upgradation Table</h6>
        <div class="table-responsive">
            <table class="table table-striped">
                 <thead v-if='technologyRecommendation.length == 0'>
                    No recommendation is registered for this technology bucket
                 </thead>
                <thead v-else style="font-size: small;">
                <tr>
                    <th><span>Id</span></th>
                    <th><span>Technology Name</span></th>
                    <th><span>Outdated Version</span></th>
                    <th><span>Stable Version</span></th>
                    <th><span>Latest Version</span></th>
                    <th><span>New Features</span></th>
                </tr>
                </thead>
                <tbody v-for="technology in technologyRecommendation" :key="technology.id" >
                <tr v-if="technology.technologyType == modalBucket">
                    <td>{{technology.id}}</td>
                    <td>{{technology.technologyName}}</td>
                    <td>{{technology.outdatedVersion}}</td>
                    <td>{{technology.stableVersion}}</td>
                    <td>{{technology.latestVersion}}</td>
                    <td style="background-color:#92d3ef;">{{technology.newFeatures}}</td>
                </tr>
                </tbody>
               
            </table>
        </div>
        <b-button class='okbtn' variant="outline-primary" @click="hideModal()"> OK </b-button>
        </b-modal>
    </div>
</template>
<script lang='ts' src='./technicalview.ts'>

</script>
<style scoped>
.bucket {
    padding: 20px;
}
.sideNav {
    min-height : 730px;
    max-height: 730px;
    overflow-y: scroll;
}
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

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #bdbaba; 
}
.CardHeading {
    margin-left: 10px;
    font-size : 22px;
    font-weight: 500;
}

.applicationDiv {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 1px 3px 1px #888888;
    background-color: white;
    margin-top:12px;
    font-size: 16px;
    font-weight: 600;
}
.applicationCard {
    padding: 10px;
    box-shadow: 3px 1px 3px 1px #888888;
    background-color: white;
    margin-top:20px;
}
#chart {
    margin-top:20px;
}
.info {
    background-color:white;
    margin-top:20px;
    padding:20px;
    border-radius: 10px;
    box-shadow: 3px 1px 3px 1px #888888;
}
.card-header {
    background: white;
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 23px;
    padding-top: 0px;
    border : none;
}
.card-footer {
    background-color: white;
    float:right;
    border:none;
    padding:0px;
}
.riskbtn {
    background-color: #e34046;
    border: none;
}
.stablebtn {
    background-color: #04d18a;
    border: none;
}
.badge-danger {
    width: 26px;
    height: 20px;
    float: right;
    margin-right:8px;
}
.badge-success {
    width: 26px;
    height: 20px;
    float: right;
    margin-right:8px;
}
.infobtn {
    background-color: #313d53;
    border-radius: 20px;
}
.DynamicContent {
    min-height: 420px;
    margin-top:20px;
}
.header {
    text-transform: uppercase;
    background-color: #313D53E6;
    color: white;
    padding: 15px;
    border-radius: 25px;
    text-align: center;
}
.addIcon {
   text-transform: uppercase;
    background-color: #313D53E6;
    color: white;
    font-size: medium;
    padding: 10px;
    border-radius: 25px;
    text-align: center;  
}
.dynamicbtn {
    text-transform: uppercase;
    background-color: #313D53E6;
    color: white;
    font-size: small;
    padding: 12px;
    border-radius: 25px;
    text-align: center;  
}
.okbtn {
    min-width: 100px;
    float: right;
    background-color: #313D53;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 18px;
}
.highLightCard {
    cursor: pointer;
    background-color: #e196ae;
}
.highLightCard:hover {
    box-shadow: 5px 10px 20px grey;
}

h6{
    font-size: 20px;
    margin: 10px;
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
</style>
    