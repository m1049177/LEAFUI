<template>
    <div>
        <h2 id="page-heading">
            <span id="integration-heading">Integrations</span>
            <router-link :to="{name: 'IntegrationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-integration">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Integration
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
        <div class="alert alert-warning" v-if="!isFetching && integrations && integrations.length === 0">
            <span>No integrations found</span>
        </div>
        <div class="table-responsive" v-if="integrations && integrations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Flow Type</span></th>
                    <th><span>Entity</span></th>
                    <th><span>Application</span></th>
                    <th><span>Integration App Id</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="integration in integrations"
                    :key="integration.id">
                    <td>
                        <router-link :to="{name: 'IntegrationView', params: {integrationId: integration.id}}">{{integration.id}}</router-link>
                    </td>
                    <td>{{integration.flowType}}</td>
                    <td>{{integration.entity}}</td>
                    <td>
                        <div v-if="integration.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: integration.application.id}}">{{integration.application.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="integration.integrationApp">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: integration.integrationApp.id}}">{{integration.integrationApp.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'IntegrationView', params: {integrationId: integration.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'IntegrationEdit', params: {integrationId: integration.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(integration)"
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
            <span slot="modal-title"><span id="leafClient3App.integration.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-integration-heading" >Are you sure you want to delete this Integration?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-integration" v-on:click="removeIntegration()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./integration.component.ts">
</script>
