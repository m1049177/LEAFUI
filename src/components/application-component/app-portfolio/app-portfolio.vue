<template>
    <div v-if="applicationSpend">
        <h2> 
          <font-awesome-icon style='height:25px;width:25px;margin-left:3px;' icon="cubes" /> 
            App Portfolio
        </h2>
      <b-row>
        <b-col cols=12>
          <div class='progressDiv'>
          <b-progress :max="max" show-value>
          <b-progress-bar id="runningTooltip" :value="value" style="background-color:#04d18a;"></b-progress-bar>
          <b-progress-bar
            id="growingTooltip"
            :value="100 - value"
            style="background-color:#049bde;"
          ></b-progress-bar>
        </b-progress>
        <b-tooltip target="runningTooltip" triggers="hover">
          Running Application:
          <b>{{value.toFixed(2) }}%</b>.
        </b-tooltip>
        <b-tooltip target="growingTooltip" triggers="hover">
          Growing Application:
          <b>{{(100 - value).toFixed(2) }}%</b>.
        </b-tooltip>
        </div>
        </b-col>
        </b-row>
          <b-row>
            <b-col sm=12 md=12 lg=7>
            <b-row>
              <b-col sm=12 md=12 lg=6 v-for="spend in applicationTotalSpend"
              :key="spend.status">
                <b-card class='individualCard'>
                  <div v-for="details in applicationSpend" :key="details.status"> 
                  <div v-if="spend.status === details.status">
                    <b-card-header>
                      <div v-for="label in dashboardData.label_data" :key='label.id'>
                        <b-row class='header' v-if='label.name === spend.status'>
                          <b-col cols=10>
                            <b-form-input v-bind:id = label.label_id
                              @change='labelChange()'
                              style='background-color:whitesmoke;
                              font-size:24px;border:none;font-weight:bold;color: #313D53E6;'
                              type='text' v-model='label.label_id'/></b-col>
                          <b-col cols=2 style='padding-top:15px;'>
                              <span><font-awesome-icon 
                              style='height:24px;width:21px;color: #313D53E6;' 
                              @click='labelEdit(label.label_id)' icon="pencil-alt" /></span>
                          </b-col>
                        </b-row></div>
                      </b-card-header>
                  <!-- <h4>{{spend.status}}</h4> -->
                  <h5>Total Spend : ${{spend.total_spend}}</h5>
              <div v-on:click="navigateFunction(spend.status)" id='charts'>
                <apexchart type=donut width=250 height=200 :options="dotnutOptions" :series="details.spendDetails" />
              </div>
                <b-button v-bind:id="spend.status+'btn'" @click="toggle(spend.status)" class='viewBtn'>View More</b-button>
              <b-collapse style='margin-top:40px;' v-bind:id='spend.status' >
                  <b-row class='listRow' v-for="(individualSpend,n) in details.spendDetails" :key='individualSpend.id'>
                    <b-list-group-item class='btnClass' variant="info">{{details.spend_type[n]}} - <b-badge variant="light">
                      ${{individualSpend}}K</b-badge></b-list-group-item>
                  </b-row>
            </b-collapse>
          </div>
          </div>
        </b-card>
        </b-col>
        </b-row>
        <b-row style='margin-top:15px'>
           <b-col sm=12 md=12 lg=6>
            <b-card>
              <span class="cardHeading">Spend VS Budget</span>
                <apexchart type=bar :options="columnBarOtions" :series="columnBarseries" />
            </b-card></b-col>
            <b-col sm=12 md=12 lg=6>
            <b-card>
              <span class="cardHeading">% Of Application Spent</span>
                <apexchart type="area" :options="areaOptions" :series="areaSeries" />
            </b-card>
        </b-col>
        </b-row>
        </b-col>
        <b-col sm=12 md=12 lg=5 class='assessmentCol'>
             <b-row >
               <b-card class='createCard'>
                 <h4>Create</h4>
                 <div>
                  <router-link :to="{name: 'AddBucket',params:{ addString:'spendType'}}" tag="button" class='dynamicbtn' >
                    <font-awesome-icon icon="plus" />
                      <span>Add new SpendType</span>
                    </router-link>

                  <router-link :to="{name: 'ApplicationCreate'}" tag="button" class='dynamicbtn' >
                    <font-awesome-icon icon="plus" />
                      <span>Add new Application</span>
                    </router-link>

                  <router-link :to="{name: 'SpendCreate'}" tag="button" class='dynamicbtn' >
                    <font-awesome-icon icon="plus" />
                      <span>Add new spend Detail for Application</span>
                    </router-link>

                  <router-link :to="{name: 'BudgetCreate'}" tag="button" class='dynamicbtn' >
                    <font-awesome-icon icon="plus" />
                      <span>Add Budget Application</span>
                    </router-link>                    
                 </div>
               </b-card>
             </b-row>
             <div class="integration">
               <h4 style="font-style:20px;">Integration Applications</h4>
            <b-row>
              <label>Select Line Of Business to list down the applications</label>
            <select v-model='selectedLOB' v-on:change='changeInDropdown' class='dropDown'>
                <option v-for='data in Lobs' :key='data.id' v-bind:value='data.name'>{{data.name}}</option>
            </select>
            </b-row>
            <label style="font-style: italic;text-decoration: dashed;" v-if="selectedLOB != ''">Applications under {{selectedLOB}} - LOB</label>
            <b-row class="appRow">
            <b-form-radio-group id="radio-group-2" v-model="selectedLOBApp" name="radio-sub-component">
              <div v-for="application in applications" :key="application.id">
            <b-form-radio v-if="application.lineOfBusiness.name === selectedLOB" v-bind:value="application.id">{{application.name}}</b-form-radio>
              </div>
              </b-form-radio-group>
        </b-row>
        <b-row style="margin-left:20px;">
          <b-button variant="primary" @click="integration(selectedLOBApp)" :disabled="selectedLOBApp === 0">Show Integration</b-button>
        </b-row>
             </div>
         <!-- <orgChartApp/> -->
        </b-col>
      </b-row>
      
    </div>
</template>
<script lang="ts" src='./app-portfolio.ts'>
</script>
<style scoped>
.cardHeading {
    font-size: medium;
    font-weight: 700;
    color: #313D53;
    margin-top: 57px;
    padding: 10px;
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
h4 {
  font-weight: bold;
  color: #313D53;
}
h3 {
  font-weight: bold;
  color: #313D53;
}
h5 {
  color: blueviolet;
  padding: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #bdbaba; 
}
.appCard {
   padding: 5px;
}
.individualCard {
    border: 1px dotted;
    /* box-shadow: 5px 10px 5px #888888; */
    background-color: whitesmoke;
    box-shadow: 5px 10px 5px #888888;
}
#charts {
  margin-top:10px;
  /* margin-left: 30px; */
}
.listRow {
  margin:auto;
  padding:2px;
}
.btnClass {
  min-width: 70%;
  background-color: powderblue;
  color: black;
  font-weight: 500;
}
.ChartCard {
  margin:auto;
  padding-left:25px;
  min-width: 400px;
}
.card {
  cursor: pointer;
}
.dynamicbtn {
    text-transform: uppercase;
    background-color: #313D53E6;
    color: white;
    font-size: small;
    padding: 8px;
    margin: 2px;
    border-radius: 25px;
    text-align: center;  
}
.viewBtn {
    float: right;
    border-radius: 20px;
    background-color: #313D53E6;
}
.progress{
    width: 95%;
    background-color:whitesmoke;
    border-radius: 16px;
    height:30px;
    margin:auto
}
.progressDiv {
  padding:12px;
}
.createCard {
    margin: 18px;
    padding: 0px;
    width: 100%;
    box-shadow: inset 0 0 5px #888888; 
}
.card-header {
  background-color: whitesmoke;
  border: none;
  padding: 2px;
}
.card-body {
  padding: 1rem 1.25rem;
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
.dropDown {
      width: 75%;
    height: 50px;
    border-radius: 10px;
    margin-left: 30px;
    padding: 10px;
    margin-bottom: 12px;
}
h6{
    width: 100%;
    color: darkblue;
    font-size: large;
}
.listClass {
    width: 100%;
    font-size: medium;
}
.appRow {
      margin-left: 15px;
    padding: 15px;
    min-height:190px;
}
.integration {
    padding: 20px;
    /* box-shadow: 5px 10px 5px #888888; */
    background-color:white;
    box-shadow: inset 0 0 5px #888888;
}
label {
    display: inline-block;
    margin-bottom: 0.75rem;
    margin-left: 15px;
}
</style>