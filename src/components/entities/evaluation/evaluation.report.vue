<template>
    <div>
    <b-card>
       <div class="form-group">
             <b-button class='reportBtn' v-b-modal.applicationReport :disabled="!selectedApplication">Application Assessment Report</b-button>
            <label class="form-control-label heading" for="evaluation-application">Assessement Report</label>
            <h6>Select Application: </h6>
            <select class="form-control" id="evaluation-application" name="application" v-model="selectedApplication" style="width:50%" v-on:change="applicationChange()" required>
                <option :value="null" disabled>-- Select application --</option>
                <option v-bind:value="applicationOption.name" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
            </select>
        </div>
     
    <div id="chart">
        <div v-if='reportData.length == 0'>
            <h4>No assessment is taken so far...Click here</h4>
            <div style='text-align: center;'>
            <font-awesome-icon class='alert-symbol' style='' icon="exclamation-triangle">
            </font-awesome-icon>
            </div>
              <router-link :to="{name: 'EvaluationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-evaluation">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                    <span>Take Assessment </span>
                </router-link>
        </div>
        <h5 v-if='reportData.length !== 0'>Total assements category taken - {{reportData.length}} </h5>
        <div style="width: 90%;margin: auto;margin-top:10px;" v-for="data in reportData" :key="data.id">
            <h3 style="font-weight:700;color:blueviolet;">{{data.category}}</h3>
            <label style="font-weight:700;color: chocolate;">No of Attempts: {{data.attemptNo}}</label>
            <apexchart type=pie width=380 :options="chartOptions" :series="data.score"/>
       </div>
        
    </div>
    </b-card>
    <b-modal size="lg" id="applicationReport" hide-footer hide-header> 
        <h3 style="color:brown;">Application Name - <b>{{selectedApplication}}</b></h3>
     <table class="table table-striped" v-if="reportData.length !== 0">
        <thead>
            <tr>
            <th><span>Category</span></th>
            <th><span>No of Attempts</span></th>
            <th style="color:green;"><span>Passed</span></th>
            <th style="color:red;"><span>Failed</span></th>
            <th><span>Attempt Date</span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in reportData"
                :key="data.id">
                <td>
                    {{data.category}}    
                </td>
                <td>{{data.attemptNo}}</td>
                <td>{{data.score[0]}}</td>
                <td>{{data.score[1]}}</td>
                <td>{{data.date}}</td>
         
                </tr>
                </tbody>
            </table>
                <table class="table table-striped" v-else>
                    <span style="font-size:18px;">No Assessment is taken so far. </span>
                       <router-link :to="{name: 'EvaluationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-evaluation">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                            <span >
                             Create new Evaluation
                            </span>
                        </router-link>
            
            </table>
            <b-button style="min-width:90px;float:right;" variant="info" @click="hideModal()"> OK </b-button>
    </b-modal>
    </div>
</template>
<script lang='ts' src='./evaluation.report.ts'>

</script>
<style scoped>
.alert-symbol {
    color:rgba(212, 38, 6, 0.5);
    height:35%;
    width:35%;
}
.heading {
    font-weight:500;
    font-size:20px;
    padding-left: 10px;
    color: #313D53;
}
h6 {
    font-size: 16px;
    font-weight: normal;
}
.reportBtn {
    float: right;
    background-color: #313D53E6;
    border-radius:15px;
    padding: 10px;
}
   
</style>