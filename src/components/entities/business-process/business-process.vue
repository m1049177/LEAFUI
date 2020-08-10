<template>
    <div>
        <h2 id="page-heading">
            <span id="business-process-heading">Business Processes</span>
            <router-link :to="{name: 'BusinessProcessCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-business-process">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new BusinessProcess
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
        <div class="alert alert-warning" v-if="!isFetching && businessProcesses && businessProcesses.length === 0">
            <span>No businessProcesses found</span>
        </div>
        <div class="table-responsive" v-if="businessProcesses && businessProcesses.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Start Date</span></th>
                    <th><span>Expected End Date</span></th>
                    <th><span>End Date</span></th>
                    <th><span>Status</span></th>
                    <th><span>Capabilities</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="businessProcess in businessProcesses"
                    :key="businessProcess.id">
                    <td>
                        <router-link :to="{name: 'BusinessProcessView', params: {businessProcessId: businessProcess.id}}">{{businessProcess.id}}</router-link>
                    </td>
                    <td>{{businessProcess.name}}</td>
                    <td>{{businessProcess.startDate}}</td>
                    <td>{{businessProcess.expectedEndDate}}</td>
                    <td>{{businessProcess.endDate}}</td>
                    <td>{{businessProcess.status}}</td>
                    <td>
                        <div v-if="businessProcess.capabilities">
                            <router-link :to="{name: 'CapabilitiesView', params: {capabilitiesId: businessProcess.capabilities.id}}"> {{businessProcess.capabilities.description}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'BusinessProcessView', params: {businessProcessId: businessProcess.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'BusinessProcessEdit', params: {businessProcessId: businessProcess.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(businessProcess)"
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
            <span slot="modal-title"><span id="leafClient3App.businessProcess.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-businessProcess-heading" >Are you sure you want to delete this Business Process?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-businessProcess" v-on:click="removeBusinessProcess()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./business-process.component.ts">
</script>
