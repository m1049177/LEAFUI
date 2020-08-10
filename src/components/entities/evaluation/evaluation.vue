<template>
    <div>
        <h2 id="page-heading">
            <span id="evaluation-heading">Evaluations</span>
            <router-link :to="{name: 'EvaluationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-evaluation">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Evaluation
                </span>
            </router-link>
            <b-button style="float: right;margin-right: 10px;" variant="outline-success" :to="{name: 'EvaluationReport'}" >Report</b-button>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && evaluations && evaluations.length === 0">
            <span>No evaluations found</span>
        </div>
        <div class="table-responsive" v-if="evaluations && evaluations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Attempt Date</span></th>
                    <th><span>Assessment Category</span></th>
                    <th><span>Score</span></th>
                    <!-- <th><span>Assessment Result</span></th> -->
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="evaluation in evaluations"
                    :key="evaluation.id"
                    :style="{ background: evaluation.score > 50 ? '#73b386' : '#e06f73' }">
                    <td>
                        <router-link :to="{name: 'EvaluationView', params: {evaluationId: evaluation.id}}">{{evaluation.id}}</router-link>
                    </td>
                    <td>{{evaluation.attemptDate}}</td>
                    <td>{{evaluation.assessmentCategory}}</td>
                    <td>{{evaluation.score}}</td>
                    <!-- <td>{{evaluation.assessmentResult}}</td> -->
                    <td>
                        <div v-if="evaluation.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: evaluation.application.id}}">{{evaluation.application.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EvaluationView', params: {evaluationId: evaluation.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <!-- <router-link :to="{name: 'EvaluationEdit', params: {evaluationId: evaluation.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link> -->
                            <!-- <b-button v-on:click="prepareRemove(evaluation)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button> -->
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="leafClient3App.evaluation.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-evaluation-heading" >Are you sure you want to delete this Evaluation?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-evaluation" v-on:click="removeEvaluation()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./evaluation.component.ts">
</script>
