<template>
    <div>
        <h2 id="page-heading">
            <span id="assessment-heading">Assessments</span>
            <router-link :to="{name: 'AssessmentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-assessment">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Assessment
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && assessments && assessments.length === 0">
            <span>No assessments found</span>
        </div>
        <div class="table-responsive" v-if="assessments && assessments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Assessment Category</span></th>
                    <th><span>Questions</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="assessment in assessments"
                    :key="assessment.id">
                    <td>
                        <router-link :to="{name: 'AssessmentView', params: {assessmentId: assessment.id}}">{{assessment.id}}</router-link>
                    </td>
                    <td style="width:25%;">{{assessment.assessmentCategory}}</td>
                    <td>
                        <b-form-textarea
                            id="textarea-auto-height"
                            v-for="item in assessment.questions.question" :key="item.id"
                            v-bind:value="item"
                            rows="2" max-rows="7" readonly=""></b-form-textarea>
                    </td>
                    <td class="text-right" style="width:15%">
                        <div >
                            <router-link :to="{name: 'AssessmentView', params: {assessmentId: assessment.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                        </div><div style="margin-top:8px;"> 
                            <router-link :to="{name: 'AssessmentEdit', params: {assessmentId: assessment.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            </div><div style="margin-top:8px;">
                            <b-button v-on:click="prepareRemove(assessment)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="leafClient3App.assessment.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-assessment-heading" >Are you sure you want to delete this Assessment?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-assessment" v-on:click="removeAssessment()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./assessment.component.ts">
</script>
