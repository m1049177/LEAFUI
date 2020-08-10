<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.assessment.home.createOrEditLabel">Create or edit a Assessment</h2>
                <div>
                    <div class="form-group" v-if="assessment.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="assessment.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="assessment-assessmentCategory">Assessment Category</label>
                        <select class="form-control" name="assessmentCategory" :class="{'valid': !$v.assessment.assessmentCategory.$invalid, 'invalid': $v.assessment.assessmentCategory.$invalid }" v-model="$v.assessment.assessmentCategory.$model" id="assessment-assessmentCategory" >
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
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">Number of Questions</label>
                        <input type="number" class="form-control" id="no" name="no"
                               v-model="questCount"/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="assessment-questions">Questions
                        </label>
                        <b-button variant="primary" style="float:right;" @click="AddQuestion()"> <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Add Question
                </span></b-button>
                        <!-- <div class="container" style="min-height:50px;min-width:50%;"> -->
                            <table v-if="questCount > 0"  style="width:100%;margin-top:20px;" id="quesTable">
                                <tbody v-for="(n) in parseInt(questCount)" :key="n">
                            <tr>
                            <td style="border:3px solid black">
                                 <b-button style="float:right;"
                                   variant="danger"
                                   class="btn btn-sm"
                                   @click="deleteQuestion(n-1)">
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline"></span>
                            </b-button>
                                <b-form-textarea
                                    v-model="assessment.questions.question[n-1]"
                                    id="textarea-auto-height"
                                    rows="2" max-rows="7"></b-form-textarea>
                            </td>
                            </tr>
                                </tbody>
                        </table>
                        </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" :disabled="$v.assessment.assessmentCategory.$invalid" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./assessment-update.component.ts">
</script>
<style scoped>
.container{
    background-color: white;
}
</style>
