<template>
    <div>
        <h2 id="page-heading">
            <span id="report-heading">Reports</span>
            <router-link :to="{name: 'ReportCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-report">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Report
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
        <div class="alert alert-warning" v-if="!isFetching && reports && reports.length === 0">
            <span>No reports found</span>
        </div>
        <div class="table-responsive" v-if="reports && reports.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Type</span></th>
                    <th><span>Reporting Tool</span></th>
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="report in reports"
                    :key="report.id">
                    <td>
                        <router-link :to="{name: 'ReportView', params: {reportId: report.id}}">{{report.id}}</router-link>
                    </td>
                    <td>{{report.name}}</td>
                    <td>{{report.type}}</td>
                    <td>{{report.reportingTool}}</td>
                    <td>
                        <div v-if="report.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: report.application.id}}">{{report.application.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ReportView', params: {reportId: report.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReportEdit', params: {reportId: report.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(report)"
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
            <span slot="modal-title"><span id="leafClient3App.report.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-report-heading" >Are you sure you want to delete this Report?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-report" v-on:click="removeReport()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./report.component.ts">
</script>
