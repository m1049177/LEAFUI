<template>
    <div>
        <h2 id="page-heading">
            <span id="activity-heading">Activities</span>
            <router-link :to="{name: 'ActivityCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-activity">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Activity
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
        <div class="alert alert-warning" v-if="!isFetching && activities && activities.length === 0">
            <span>No activities found</span>
        </div>
        <div class="table-responsive" v-if="activities && activities.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Description</span></th>
                    <th><span>Resources Required</span></th>
                    <th><span>Business Process</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="activity in activities"
                    :key="activity.id">
                    <td>
                        <router-link :to="{name: 'ActivityView', params: {activityId: activity.id}}">{{activity.id}}</router-link>
                    </td>
                    <td>{{activity.name}}</td>
                    <td>{{activity.description}}</td>
                    <td>{{activity.resourcesRequired}}</td>
                    <td>
                        <div v-if="activity.businessProcess">
                            <router-link :to="{name: 'BusinessProcessView', params: {businessProcessId: activity.businessProcess.id}}">{{activity.businessProcess.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ActivityView', params: {activityId: activity.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ActivityEdit', params: {activityId: activity.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(activity)"
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
            <span slot="modal-title"><span id="leafClient3App.activity.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-activity-heading" >Are you sure you want to delete this Activity?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-activity" v-on:click="removeActivity()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./activity.component.ts">
</script>
