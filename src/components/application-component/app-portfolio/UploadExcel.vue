<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <b-card>
        <b-card-header style="background:rgb(0, 79, 116)">
          <h5 style="color:white">
            Download App Portfolio Template
            <span
              style="float:right;padding-right:40px"
              v-for="template in templates"
              :key="template.id"
            >
            <font-awesome-icon style="font-size:32px;cursor:pointer" v-if=" template.type==='APPPORTFOLIO'" 
            v-on:click="openFile(template.fileNameContentType, template.fileName)" icon="download" /> 
            </span>
          </h5>
        </b-card-header>
        <b-card-body >
          <label>          
            <input class="input" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          </label>
          <button style="border-radius:20px;min-width:100px;maargin-left:15px;" type="submit" class="btn btn-info" v-on:click="uploadAppView($event)" >Upload</button>
        </b-card-body>
      </b-card>
    </div>
     <!-- <div class="large-12 medium-12 small-12 cell">
      <b-card>
        <b-card-header style="background:rgb(0,114,167)">
          <h5 style="color:white">
            Download Technology View Template
            <span
              style="float:right;padding-right:40px"
              v-for="template in templates"
              :key="template.id"
            >
              <i
                style="font-size:32px;cursor:pointer"
                class="fa fa-download"
                aria-hidden="true"
                v-if="template.fileName && template.company.companyName === 'Titan' && template.type==='APPPORTFOLIO'"
                v-on:click="openFile(template.fileNameContentType, template.fileName)"
              ></i>
            </span>
          </h5>
        </b-card-header>
        <b-card-body >
          <label>          
            <input class="input" type="file" id="file2" ref="file2"  />
          </label>
          <button style="border-radius:20px;min-width:100px" type="submit" class="btn btn-info"  >Upload</button>
        </b-card-body>
      </b-card>
    </div> -->
     <div class="large-12 medium-12 small-12 cell">
      <b-card>
        <b-card-header style="background:rgb(0, 146, 214)">
          <h5 style="color:white">
            Download Functional View Template
            <span
              style="float:right;padding-right:40px"
              v-for="template in templates"
              :key="template.id"
            >
            <font-awesome-icon style="font-size:32px;cursor:pointer" v-if=" template.type==='BIZVIEW'" 
            v-on:click="openFile(template.fileNameContentType, template.fileName)" icon="download" /> 
              <!-- <i
                style="font-size:32px;cursor:pointer"
                class="fa fa-download"
                aria-hidden="true"
                v-if="template.fileName && template.type==='BIZVIEW'"
                v-on:click="openFile(template.fileNameContentType, template.fileName)"
              ></i> -->
            </span>
          </h5>
        </b-card-header>
        <b-card-body >
          <label>          
            <input class="input" type="file" id="file1" ref="file1" v-on:change="handleFile1Upload()" />
          </label>
          <button style="border-radius:20px;min-width:100px;margin-left:15px;" type="submit" class="btn btn-info" @click="uploadFunctionalView($event)" >Upload</button>
        </b-card-body>
      </b-card>
    </div>
  </div>
   <!-- <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </label>
      <button type="submit" v-on:click="submitFile($event)">Submit</button>
      <div v-for="template in templates" :key="template.id" style="float:right">
        <a class="btn btn-info"
          v-if="template.fileName && template.company.companyName === 'Titan' && template.type==='APPPORTFOLIO'"
          v-on:click="openFile(template.fileNameContentType, template.fileName)"
        >Download Template</a>
      </div>
      <button class="btn btn-primary" v-on:click="dowloadTemplate()">Download Template</button>
    </div>
  </div> -->

</template>

<script lang="ts" src="./UploadExcel.ts">
</script>
<style scoped>
.container {
  padding-top: 30px;
  /* background: whitesmoke; */
}
.input{
  border: 2px solid #BCE0FD;
  height: 40px;
  width: 520px;
  padding: 2px
}
.card{
   background: whitesmoke;
}
.cell{
  padding-bottom: 20px;
}

</style>
