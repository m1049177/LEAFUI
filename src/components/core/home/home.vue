<template>
  <div class="home">
      <h2> 
          <font-awesome-icon style='height:25px;width:25px;margin-left:3px;' icon="home" /> 
            Dashoard
      </h2>
    <div>
      <router-link :to="{name: 'AddBucket',params:{ addString:'spendType'}}" tag="button" class='dynamicbtn' >
          <font-awesome-icon icon="plus" />
          <span>Add new SpendType</span>
       </router-link>
    </div>
    <!-- <b-button @click='searching()'>search</b-button> -->
    <b-row>
      <b-col sm=10 md=10 lg=6
      style='margin:auto;'
        v-for="spend in applicationTotalSpend"
        :key="spend.status"
        no-body
        class='appCard'
        >
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
                      style='height:24px;width:21px;color: #313D53E6;' @click='labelEdit(label.label_id)' icon="pencil-alt" /></span></b-col>
              </b-row></div></b-card-header>
          <b-row v-on:click="navigateFunction(spend.status)">
          <b-col sm=5 md=5 lg=5>
            <h5>Total Spend : ${{spend.total_spend}}</h5>
            <b-row class='listRow' v-for="(individualSpend,n) in details.spendDetails" :key='individualSpend.id'>
              <b-list-group-item class='btnClass' variant="info">{{details.spend_type[n]}} - <b-badge variant="light">
                  ${{individualSpend}}K</b-badge>
              </b-list-group-item>
            </b-row>
            </b-col>
            <b-col sm=7 md=7 lg=7 style="margin-top:20px;">
              <div id='charts'>
             <apexchart type=donut width=300 height=200 :options="dotnutOptions" :series="details.spendDetails" />
            </div>
            </b-col>
          </b-row>


          </div>
          </div>
        </b-card>
        </b-col>
    </b-row>
     
  </div>
</template>

<script lang="ts" src="./home.component.ts">

</script>
<style scoped>
.container {
  background-color: white;
  padding-top: 30px;
}
h4 {
  font-weight: bold;
  color: brown;
}
h5 {
  color: blueviolet;
  margin-bottom: 10px;
  padding: 10px;
}
h3{
  color:black;
}
.cursor {
  cursor: pointer;
}
.mainRow {
  padding-left:40px;
}
.cardDiv {
   box-shadow: 5px 5px 5px #888888;
   background-color: white;
   border-radius:20px;
   padding:15px;

}
.appCard {
    padding:20px;
}
.individualCard {
    border: 1px dotted;
    /* box-shadow: 5px 10px 5px #888888; */
    background-color: whitesmoke;
    box-shadow: 5px 10px 5px #888888;
}
#charts {
  margin-top:10px;
}
.listRow {
  margin:auto;
  padding:4px;
}
.btnClass {
  width:100%;
  background-color: powderblue;
  color: black;
}
.ChartCard {
  margin:auto;
  padding-left:25px;
  min-width: 400px;
}
.card {
  cursor: pointer;
}
.card-body {
  padding: 1rem 1.25rem;
}
.card-header {
  background-color: whitesmoke;
  border: none;
  padding: 2px;
}
.header {
  border-radius: 15px;
}
.dynamicbtn {
    margin: 10px;
    background-color: #313D53E6;
    border: none;
    border-radius: 12px;
    height: 40px;
    color: white;
    padding: 9px;
    float:right;
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
</style>