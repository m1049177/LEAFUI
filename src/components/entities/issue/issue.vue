<template>
    <div>
        <h2 id="page-heading">
            <span id="issue-heading">Issues</span>
            <router-link :to="{name: 'IssueCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-issue">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Issue
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
        <div class="alert alert-warning" v-if="!isFetching && issues && issues.length === 0">
            <span>No issues found</span>
        </div>
        <div class="table-responsive" v-if="issues && issues.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Description</span></th>
                    <th><span>Date Of Issue</span></th>
                    <th><span>Status</span></th>
                    <th><span>Solved Date</span></th>
                    <th><span>Solved By</span></th>
                    <th><span>Number Of Days</span></th>
                    <th><span>Type Of Issue</span></th>
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="issue in issues"
                    :key="issue.id">
                    <td>
                        <router-link :to="{name: 'IssueView', params: {issueId: issue.id}}">{{issue.id}}</router-link>
                    </td>
                    <td>{{issue.description}}</td>
                    <td>{{issue.dateOfIssue}}</td>
                    <td>{{issue.status}}</td>
                    <td>{{issue.solvedDate}}</td>
                    <td>{{issue.solvedBy}}</td>
                    <td>{{issue.numberOfDays}}</td>
                    <td>{{issue.typeOfIssue}}</td>
                    <td>
                        <div v-if="issue.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: issue.application.id}}">{{issue.application.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'IssueView', params: {issueId: issue.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'IssueEdit', params: {issueId: issue.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(issue)"
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
            <span slot="modal-title"><span id="leafClient3App.issue.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-issue-heading" >Are you sure you want to delete this Issue?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-issue" v-on:click="removeIssue()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./issue.component.ts">
</script>
