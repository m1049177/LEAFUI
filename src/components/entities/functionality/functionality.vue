<template>
    <div>
        <h2 id="page-heading">
            <span id="functionality-heading">Functionalities</span>
            <router-link :to="{name: 'FunctionalityCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-functionality">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Functionality
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
        <div class="alert alert-warning" v-if="!isFetching && functionalities && functionalities.length === 0">
            <span>No functionalities found</span>
        </div>
        <div class="table-responsive" v-if="functionalities && functionalities.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Major Modules</span></th>
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="functionality in functionalities"
                    :key="functionality.id">
                    <td>
                        <router-link :to="{name: 'FunctionalityView', params: {functionalityId: functionality.id}}">{{functionality.id}}</router-link>
                    </td>
                    <td>{{functionality.name}}</td>
                    <td>{{functionality.majorModules}}</td>
                    <td>
                        <div v-if="functionality.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: functionality.application.id}}">{{functionality.application.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'FunctionalityView', params: {functionalityId: functionality.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'FunctionalityEdit', params: {functionalityId: functionality.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(functionality)"
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
            <span slot="modal-title"><span id="leafClient3App.functionality.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-functionality-heading" >Are you sure you want to delete this Functionality?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-functionality" v-on:click="removeFunctionality()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./functionality.component.ts">
</script>
