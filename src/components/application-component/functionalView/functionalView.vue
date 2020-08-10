<template>
  <div>
    <h2> 
        <font-awesome-icon style='height:25px;width:25px;margin-left:3px;' icon="chalkboard-teacher" /> 
            Functional View
    </h2>
    <div class="row" style="padding-left:30px">
      <b-card-group deck style="width:100%">
        <b-card class='highlight' @click="navigateFunction('OraganizationalUnit')"
        style="background: rgb(163, 226, 255);">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{organizationalUnitsCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon icon="home" class='divIcon' />
            </div>
          </div>
          <div class="row">
            <h6>Organizational Units</h6>
          </div>
        </b-card>
        <b-card 
        class='highlight' @click="navigateFunction('BusinessFunction')"
        style="background: rgb(91, 203, 255);">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{businessFunctionsCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon icon="th-list" class='divIcon'></font-awesome-icon>
            </div>
          </div>
          <div class="row">
            <h6>Business Functions</h6>
          </div>
        </b-card>
        <b-card class='highlight' @click="navigateFunction('Capabilities')"
        style="background:rgb(36, 184, 253)">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{capabilitiesCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon icon="shield-alt" class='divIcon'></font-awesome-icon>
            </div>
          </div>
          <div class="row">
            <h6>Capabilities</h6>
          </div>
        </b-card>
        <b-card class='highlight' @click="navigateFunction('BusinessProcess')" 
        style="background: rgb(0, 146, 214)">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{processesCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon
                class='divIcon'
                icon="exclamation-triangle"
              />
            </div>
          </div>
          <div class="row">
            <h6>Processes</h6>
          </div>
        </b-card>
        <b-card class='highlight' @click="navigateFunction('Activity')"
        style="background: rgb(0, 114, 167)">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{activitiesCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon icon="th-list" class='divIcon'></font-awesome-icon>
            </div>
          </div>
          <div class="row">
            <h6 to="/entity/activity">Activities</h6>
          </div>
        </b-card>
        <b-card class='highlight' @click="navigateFunction('Task')"
        style="background: rgb(0, 79, 116)">
          <div class="row">
            <div class="col-lg-6">
              <h1>{{tasksCount}}</h1>
            </div>
            <div class="col-lg-6">
              <font-awesome-icon icon="pencil-alt" class='divIcon'></font-awesome-icon>
            </div>
          </div>
          <div class="row">
            <h6>Tasks</h6>
          </div>
        </b-card>
      </b-card-group>
    </div>
    <b-row>
      <div class='collapsableCol'>
      <div
        v-for="OrganizationalData in organizationalUnits"
        :key="OrganizationalData.id">
          <b-card no-body>
            <b-card-header header-tag="header" class="p-1" role="tab">{{OrganizationalData.name}}</b-card-header>
            <b-card-body>
              <div v-for="lobDetail in data" :key="lobDetail.id">
                <div v-if="lobDetail.lob.oraganizationalUnit.id === OrganizationalData.id">
                  <b-button
                    class="togglebtn"
                    v-if="lobDetail.lob.oraganizationalUnit.id === OrganizationalData.id"
                    v-b-toggle="'accordicon'+lobDetail.lob.id"
                  >{{lobDetail.lob.name}}</b-button>
                  <b-collapse
                    v-bind:id="'accordicon' + lobDetail.lob.id"
                    accordion="my-accordion"
                    class="my-accordion"
                    role="tabpanel"
                  >
                    <!-- <div class="collapseHeading">
                      <font-awesome-icon icon="th-list" />Business Functions
                    </div> -->
                    <div
                      v-for="businessfunction in lobDetail.businessFunction"
                      :key="businessfunction.id"
                    >
                      <b-list-group-item
                        v-b-toggle="'capability'+businessfunction.id">
                          <span class="collapseHeading">
                             <font-awesome-icon icon="th-list" /> Business Functions - 
                            </span>
                      {{businessfunction.name}}</b-list-group-item>

                      <b-collapse
                        :id="'capability'+businessfunction.id"
                        class="my-accordion"
                        role="tabpanel"
                      >
                        <div v-for="capability in businessCapabilities" :key="capability.id">
                          <b-list-group-item
                            class="capabilityList"
                            v-if="capability.businessFunction.id === businessfunction.id">
                            <span class="collapseHeading">
                              <font-awesome-icon icon="shield-alt" /> Capability -
                            </span>
                            {{capability.description}}
                          </b-list-group-item>
                        </div>
                      </b-collapse>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </div>
  
      <div class='chartDiv'>
        <h5 class='header'>Hierarchical View </h5>
        <b-row>
           <select v-model='selectedCategory' v-on:change='changeInDropdown' class='dropDown'>
             <option value="" disabled selected hidden>Choose level to add</option>
              <option v-for='data in dropDownData' :key='data.id' v-bind:value='data'>{{data}}</option>
            </select>
            <b-button :disabled="selectedCategory == ''" class='chartBtn' @click='add()' variant="success">Add</b-button>
        </b-row>
        <b-row style="margin-top:5px;">
          <b-col offset="1" cols=2>
            <svg width="30" height="30">
              <circle cx="18" cy="15" r="10" fill="#e5a2e5" /> 
            </svg> Company
          </b-col>

          <b-col cols=2>
            <svg width="30" height="30">
              <circle cx="18" cy="15" r="10" fill="#66d7d3" /> 
            </svg> Organizational Unit
          </b-col>

          <b-col cols=2>
            <svg width="30" height="30">
              <circle cx="18" cy="15" r="10" fill="#f2d267" /> 
            </svg> Line Of Business
          </b-col>

          <b-col cols=2>
            <svg width="30" height="30">
              <circle cx="18" cy="15" r="10" fill="#67bd7f" /> 
            </svg> BusinessFunction
          </b-col>

          <b-col cols=2>
            <svg width="30" height="30">
              <circle cx="18" cy="15" r="10" fill="#56c0f0" /> 
            </svg> Capabilities
          </b-col>
          
        </b-row>
      
        <div v-if='dropdown'>
         
        </div>
       <orgChart v-bind:CompanyId="company_id"></orgChart>   
      </div>
    </b-row>
  </div>
</template>
<script lang="ts" src="./functionalView.ts">
</script>
<style scoped>
    @import "../chart/ejs-diagram.css";
.divIcon {
  width:60%;
  height:70%;
  color:white;
}
h1 {
  font-family: proxima_nova_rgregular, Arial, sans-serif;
  font-size: 34px;
  height: 16px;
  text-align: left;
  color: rgb(255, 255, 255);
  font-weight: normal;
  font-style: normal;
  text-decoration: none;
}
h6 {
  color: rgb(255, 255, 255);
  font-family: proxima_nova_rgregular, Arial, sans-serif;
  font-weight: bold;
  font-style: normal;
  padding-left: 10px;
}
.my-accordion {
  padding-bottom: 10px;
}

.togglebtn {
  background: rgb(0, 146, 214);
  margin-bottom: 10px;
  width: 100%;
}
.card {
  margin-top: 20px;
}
.card-header {
  font-size: 18px;
  font-weight: 500;
}
.capabilityList {
  width: 80%;
  margin: auto;
  background: rgb(36, 184, 253);
  margin-top: 10px;
}

.collapseHeading {
  padding: 9px;
  font-size: 20px;
}
.collapsableCol {
  min-height: 720px;
  max-height: 720px;
  overflow-y:scroll;
  margin-top:20px;
  max-width:20%;
  padding:10px;
  /* margin-left: 10px; */
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
::-webkit-scrollbar-thumb:hover {
  background: #bdbaba; 
}

.highlight {
  cursor: pointer;
}
.highlight:hover {
  box-shadow: 5px 10px 20px grey;
}
.chartDiv {
  flex-grow: 1;
  width: 75%;
  margin-top: 20px;
    /* position: relative;
    display: inline-block;
    min-height:600px;
    width: calc(80% - 24px);
    border: 2px dashed #aaa;
    border-radius: 5px;
    overflow: auto;
    text-align: center; */
}
.header {
    text-transform: uppercase;
    background-color: #313D53;
    color: white;
    padding: 12px;
    margin:10px;
    border-radius: 20px;
    text-align: center;
}
.chartBtn {
    width: 15%;
    margin-left: 30px;
    border-radius: 22px;
}
.dropDown {
  width: 40%;
  border-radius: 10px;
  margin-left: 30px;
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
</style>