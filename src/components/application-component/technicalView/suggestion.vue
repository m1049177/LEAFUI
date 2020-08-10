<template>
   <div>
        <h2> 
            <font-awesome-icon style='height:25px;width:20px;margin-left:3px;' icon="exclamation-triangle" /> 
            Technology Suggestion View
        </h2>
   
    <b-row>
        <div v-if="this.type == 'RISK'" style="width:80%;margin:auto;">
            <h6 class="heading">{{this.bucket}} </h6>
            <h6 class='header'> Applications are under risk and will get crash soon. </h6>
            <div v-if='this.technologySuggestion.length == 0'><h4>No Application are under risk</h4></div>
            <b-card style="margin-top:15px;" v-for="data in technologySuggestion" :key="data.id">
                <b-card-header>
                    <dt><span>Technology</span></dt>
                    <dd><span>{{data.technology.name}}</span></dd>
                </b-card-header>
                <b-card-body >
                    <ul v-for="(n,index) in data.suggestion.length" :key="n">
                        <li style="color:red;">{{data.description[index]}}
                        <div style='color:black'><span style="color:green;font-size: 18px;font-weight: 700;">Suggestion : </span>{{data.suggestion[index]}}</div></li>
                    </ul>
                    <div>
                        <label><b> These are the application which uses {{data.technology.name}} are under risk .</b></label>
                        <b-list-group>
                        <b-list-group-item :to="{name: 'ApplicationView', params: {applicationId: application.id}}"  v-for="application in data.application" :key="application.id">{{application.name}}</b-list-group-item>
                        </b-list-group>  
                    </div>
                </b-card-body>
                
            </b-card>
            
        </div>
      <div v-else style="width:80%;margin:auto;">
          <h6 class="heading">{{this.bucket}} </h6>
            <h6 class='header'> Application needs upgradation to perform better in optimized way. </h6>
            <div v-if='this.technologySuggestion.length == 0'><h4>No Application are under this category</h4></div>
           <b-card style="margin-top:15px;" v-for="data in technologySuggestion" :key="data.id">
                <b-card-header>
                      <dt><span>Technology</span></dt>
                    <dd><span>{{data.technology.name}}</span></dd>
                </b-card-header>
                <b-card-body>
                    <ul v-for="(n,index) in data.suggestion.length" :key="n">
                        <li style="color:red;"> {{data.description[index]}}
                        <div style='color:black'><span style="color:green;font-size: 18px;font-weight: 700;">Suggestion : </span>{{data.suggestion[index]}}</div></li>
                    </ul>
                    <div>
                        <label><b> These are the application which uses {{data.technology.name}} need update.</b></label>
                        <b-list-group>
                        <b-list-group-item :to="{name: 'ApplicationView', params: {applicationId: application.id}}"  v-for="application in data.application" :key="application.id">{{application.name}}</b-list-group-item>
                        </b-list-group>  
                    </div>
                </b-card-body>
                
            </b-card>
      </div>
  </b-row>
    </div>
</template>
<script lang='ts' src='./suggestion.ts'>

</script>
<style scoped>
.justify-content-center{
    -webkit-box-pack: center !important;
    justify-content: center !important;
    width: 50%;
    margin: auto;
    background-color: white;
}
.heading{
    color:black; 
    font-size: 23px;
    font-weight: 400;
    text-align: center;
}
.card {
    background-color:white;
    border-radius: 20px;
    box-shadow: 3px 1px 3px 1px #888888;
    color:black;
}
.header {
    text-transform: uppercase;
    background-color: #313D53;
    color: white;
    padding: 18px;
    border-radius: 20px;
    text-align: center;
}
.card-header {
   background-color: #E3E3E3;
    width: fit-content;
    border-radius: 12px;
    padding-left: 30px;
    padding-right: 30px;
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