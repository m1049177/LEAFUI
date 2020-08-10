<template>
    <div>
        <h2 id="page-heading">
            <span id="capabilities-heading">Capabilities</span>
            <router-link :to="{name: 'CapabilitiesCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-capabilities">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Capabilities
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
        <div class="alert alert-warning" v-if="!isFetching && capabilities && capabilities.length === 0">
            <span>No capabilities found</span>
        </div>
        <div class="table-responsive" v-if="capabilities && capabilities.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Description</span></th>
                    <th><span>Business Function</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="capabilities in capabilities"
                    :key="capabilities.id">
                    <td>
                        <router-link :to="{name: 'CapabilitiesView', params: {capabilitiesId: capabilities.id}}">{{capabilities.id}}</router-link>
                    </td>
                    <td>{{capabilities.description}}</td>
                    <td>
                        <div v-if="capabilities.businessFunction">
                            <router-link :to="{name: 'BusinessFunctionView', params: {businessFunctionId: capabilities.businessFunction.id}}"> {{capabilities.businessFunction.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'CapabilitiesView', params: {capabilitiesId: capabilities.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'CapabilitiesEdit', params: {capabilitiesId: capabilities.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(capabilities)"
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
            <span slot="modal-title"><span id="leafClient3App.capabilities.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-capabilities-heading" >Are you sure you want to delete this Capabilities?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-capabilities" v-on:click="removeCapabilities()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./capabilities.component.ts">
</script>
