<template>
    <div>
        <h2 id="page-heading">
            <span id="application-heading">Applications</span>
            <router-link :to="{name: 'ApplicationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-application">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Application
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
        <div class="alert alert-warning" v-if="!isFetching && applications && applications.length === 0">
            <span>No applications found</span>
        </div>
        <div class="table-responsive" v-if="applications && applications.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Description</span></th>
                    <th><span>Type</span></th>
                    <th><span>Status</span></th>
                    <th><span>Implementation Date</span></th>
                    <th><span>Line Of Business</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="application in applications"
                    :key="application.id">
                    <td>
                        <router-link :to="{name: 'ApplicationView', params: {applicationId: application.id}}">{{application.id}}</router-link>
                    </td>
                    <td>{{application.name}}</td>
                    <td>{{application.description}}</td>
                    <td>{{application.type}}</td>
                    <td>{{application.status}}</td>
                    <td>{{application.implementationDate}}</td>
                    <td>
                        <div v-if="application.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: application.lineOfBusiness.id}}">{{application.lineOfBusiness.id}}- {{application.lineOfBusiness.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: application.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ApplicationEdit', params: {applicationId: application.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(application)"
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
            <span slot="modal-title"><span id="leafClient3App.application.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-application-heading" >Are you sure you want to delete this Application?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-application" v-on:click="removeApplication()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./application.component.ts">
</script>
