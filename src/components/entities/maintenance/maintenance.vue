<template>
    <div>
        <h2 id="page-heading">
            <span id="maintenance-heading">Maintenances</span>
            <router-link :to="{name: 'MaintenanceCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-maintenance">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Maintenance
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
        <div class="alert alert-warning" v-if="!isFetching && maintenances && maintenances.length === 0">
            <span>No maintenances found</span>
        </div>
        <div class="table-responsive" v-if="maintenances && maintenances.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Start Date</span></th>
                    <th><span>End Date</span></th>
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="maintenance in maintenances"
                    :key="maintenance.id">
                    <td>
                        <router-link :to="{name: 'MaintenanceView', params: {maintenanceId: maintenance.id}}">{{maintenance.id}}</router-link>
                    </td>
                    <td>{{maintenance.startDate}}</td>
                    <td>{{maintenance.endDate}}</td>
                    <td>
                        <div v-if="maintenance.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: maintenance.application.id}}">{{maintenance.application.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'MaintenanceView', params: {maintenanceId: maintenance.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'MaintenanceEdit', params: {maintenanceId: maintenance.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(maintenance)"
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
            <span slot="modal-title"><span id="leafClient3App.maintenance.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-maintenance-heading" >Are you sure you want to delete this Maintenance?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-maintenance" v-on:click="removeMaintenance()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./maintenance.component.ts">
</script>
