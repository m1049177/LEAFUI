<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.evaluation.home.createLabel">Create a Assessment</h2>
                <div>
                    <div class="form-group" v-if="evaluation.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="evaluation.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="evaluation-application">Application</label>
                        <select class="form-control" id="evaluation-application" name="application" v-model="evaluation.application" required>
                            <!-- <option v-if="!evaluation.application" v-bind:value="null" selected></option> -->
                            <option v-bind:value="evaluation.application && applicationOption.id === evaluation.application.id ? evaluation.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.evaluation.application.$anyDirty && $v.evaluation.application.$invalid">
                        <small class="form-text text-danger" v-if="!$v.evaluation.application.required">
                            This field is required.
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="evaluation-assessmentCategory">Assessment Category</label>
                        <select class="form-control" name="assessmentCategory" :class="{'valid': !$v.evaluation.assessmentCategory.$invalid, 'invalid': $v.evaluation.assessmentCategory.$invalid }" 
                        v-model="$v.evaluation.assessmentCategory.$model" id="evaluation-assessmentCategory" required>
                            <option value="ARCHITECTUREPRINCIPLE" >ARCHITECTUREPRINCIPLE</option>
                            <option value="DEPLOYMENT" >DEPLOYMENT</option>
                            <option value="INTERNATIONALIZATION" >INTERNATIONALIZATION</option>
                            <option value="SECURITY" >SECURITY</option>
                            <option value="AVAILABILITY" >AVAILABILITY</option>
                            <option value="SCALABILITY" >SCALABILITY</option>
                            <option value="RELIABILITY" >RELIABILITY</option>
                            <option value="MAINTAINABILITY" >MAINTAINABILITY</option>
                            <option value="DATAARCHITECTURE" >DATAARCHITECTURE</option>
                        </select>
                        <div v-if="$v.evaluation.assessmentCategory.$anyDirty && $v.evaluation.assessmentCategory.$invalid">
                            <small class="form-text text-danger" v-if="!$v.evaluation.assessmentCategory.required">
                                This field is required.
                            </small>
                        </div>
                        <b-card class="question-card" v-if="$v.evaluation.assessmentCategory.$model">
                        <h3 class="card-heading">{{evaluation.assessmentCategory}} Assessment</h3>
                        <b-form-group v-for="assessment in evaluationOutput" :key="assessment.id"> 
                            <div v-if="assessment.category == evaluation.assessmentCategory">
                                <div class="questionset" v-for="n in assessment.question.length" :key="n">
                                <b-form-textarea
                                    v-model="assessment.question[n-1]"
                                    id="textarea-auto-height"
                                    v-bind:value="assessment.question[n-1]"
                                    rows="2" max-rows="7" readonly=""></b-form-textarea>
                                 <b-form-group>
                                <b-form-radio-group
                                v-model="assessment.result[n-1]"
                                :options="options"
                                stacked
                                v-bind:name="assessment.question[n-1]"
                                ></b-form-radio-group>
                                </b-form-group>
                                   <b-form-textarea
                                    v-model="assessment.description[n-1]"
                                    id="textarea-auto-height"
                                   placeholder="Description(optional)"
                                    rows="2" max-rows="7"></b-form-textarea>
                            </div> 
                            </div>
                        </b-form-group>
                    </b-card>
                </div>
                  
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.evaluation.$invalid || isSaving " class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./evaluation-update.component.ts">

</script>
<style scoped>

.card-heading{
    font-size:22px;
    font-weight:600;
    padding-bottom: 25px;
    text-decoration: underline;
    text-transform: uppercase;
}

.question-card{
    margin-top: 20px;
}
.questionset{
    border: 2px solid black;
    margin-top:10px;
}
</style>