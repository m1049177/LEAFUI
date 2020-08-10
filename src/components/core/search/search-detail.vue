<template>
<div>
    <b-button class='backButton' style='float: left;width: 9%;' @click='back()'> Back</b-button>
    <div class='searchDetailComponent'>

    <div v-if="type !== 'lob'">
        <h4>Search Result : Technology</h4>
            <b-row>
            <b-col cols="3" class='technology'>
                <dt><span>Technology</span></dt>
                <dd><span>{{this.technology.technologyStack.name}}</span></dd>
            </b-col>
            <b-col offset="4" cols="3" class='application'>
                <dt><span>Application</span></dt>
                <dd><span>{{this.technology.application.name}}</span></dd>
            </b-col>
            </b-row>
        <b-row>
        <div class='suggestionClass' v-for='suggestion in techSuggestion' :key='suggestion.id'>
            <h6>{{suggestion.type}}-{{suggestion.technologyRecommendation.technologyName}}-{{suggestion.version}}</h6>
            <li style="color:red;">{{suggestion.description}}
            <div style='color:black'><span style="color:green;font-size: 18px;font-weight: 700;">Suggestion : </span>{{suggestion.suggestion}}</div></li>
        </div>
        </b-row>
        </div>

<div v-if="type == 'lob'">
    <h4>Search Result : Line Of Business ({{lobData.name}}) </h4>
    <b-tabs pills card vertical end>
        <div v-for="bfdata in lobData.bFunction" :key="bfdata.id">
        <b-tab style="width:90%;margin:auto;" v-if='bfdata.lineOfBusiness.id === lobData.id' :title="bfdata.name">
            <div v-for="cap_data in lobData.capability" :key="cap_data.id">
                <div v-if='bfdata.id === cap_data.businessFunction.id'>
                    <b-button variant="light" class='capCard' v-b-toggle="'cap' + cap_data.id"> <span class="collapseHeading">
                        <font-awesome-icon icon="shield-alt" />Capability -
                            </span>{{cap_data.description}}
                    </b-button>
                        <div v-for="bprocess in lobData.bProcesses" :key="bprocess.id">
                            <div v-if='cap_data.id === bprocess.capabilities.id'>                                    
                                <b-collapse class='processCard' v-bind:id="'cap' + cap_data.id">
                                    <b-button variant="light" class='processBtn' v-b-toggle="'process' + bprocess.id"> <span class="collapseHeading">
                                        <font-awesome-icon icon="cubes" />Business Process - </span>
                                        {{bprocess.name}}</b-button>
                                        <div v-for="activity in lobData.activities" :key='activity.id'>
                                            <div v-if="activity.businessProcess.id === bprocess.id">
                                                <b-collapse v-bind:id="'process' + bprocess.id">
                                                    <b-list-group-item class='activityList'>
                                                        <font-awesome-icon icon="th-list" /> Activity - {{activity.name}}
                                                            <div v-for='task in lobData.tasks' :key='task.id'> 
                                                                <div class="taskDiv" v-if="task.activity.id === activity.id">
                                                                    <font-awesome-icon icon="pencil-alt" /> Task - {{task.name}}
                                                                </div>
                                                            </div>
                                                        </b-list-group-item>
                                                </b-collapse>
                                            </div>
                                        </div>
                                </b-collapse>
                            </div>
                        </div>
                    </div>
                </div>
                </b-tab>
            </div>
        </b-tabs>
    </div>
</div>
</div>
</template>
<script lang='ts' src='./search-detail.ts'>

</script>
<style scoped>
.searchDetailComponent{
    width: 80%;
    margin:auto;
    margin-top:15px;
    padding: 15px;
    background-color: whitesmoke;
    box-shadow: 3px 3px 3px 3px #888888;
}
h4 {
    background-color: #313D53;
    color: white;
    padding: 6px;
    font-size: larger;
    border-radius: 20px;
    text-align: center;
    margin: 20px;
}
.technology {
    border-radius: 15px;
    background-color: #E3E3E3;
    width: 20%;
    float: left;
    padding: 10px 15px;
    margin: 10px;
    margin-left: 30px;
}
.application {
    border-radius: 15px;
    background-color: #E3E3E3;
    width: 25%;
    float: right;
    padding: 10px 15px;
    margin: 10px;
    margin-left: 20px;
}
.suggestionClass {
    width: 100%;
    margin: 20px;
    padding: 10px;
    margin-left: 25px;
}
.bfCard {
    width: 30%;
    margin:10px;
    padding: 10px;
    margin-left:15px;
}
.capCard{
    border: 2px solid dodgerblue;
    background: none;
    color: black;
    width: 90%;
    padding: 10px;
    margin: 10px;
    border-radius: 12px;
}
.processCard{
    width: 70%;
    border-radius: 12px;
    margin: 10px;
    padding: 10px;
    margin-left: 31px;
    background-color: #E3E3E3;
    box-shadow: 3px 3px 3px 3px #888888;
}
.processBtn {
    border: 1px solid powderblue;
    background: powderblue;
    color: black;
    width: 90%;
    padding: 10px;
    margin: 10px;
    border-radius: 12px;   
}
.activityList {
    padding: 12px;
    margin: 7px;
    width: 80%;
    border-radius: 12px;
    margin-left: 40px;
    background: none;
    border: 2px solid dodgerblue;
}
.taskDiv {
    padding: 10px;
    width: 90%;
    margin: auto;
}
</style>