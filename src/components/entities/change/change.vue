<template>
    <div>
        <h2 id="page-heading">
            <span id="change-heading">Changes</span>
            <router-link :to="{name: 'ChangeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-change">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Change
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
        <div class="alert alert-warning" v-if="!isFetching && changes && changes.length === 0">
            <span>No changes found</span>
        </div>
        <div class="table-responsive" v-if="changes && changes.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Description</span></th>
                    <th><span>Date Of Change</span></th>
                    <th><span>Application</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="change in changes"
                    :key="change.id">
                    <td>
                        <router-link :to="{name: 'ChangeView', params: {changeId: change.id}}">{{change.id}}</router-link>
                    </td>
                    <td>{{change.description}}</td>
                    <td>{{change.dateOfChange}}</td>
                    <td>
                        <div v-if="change.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: change.application.id}}">{{change.application.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ChangeView', params: {changeId: change.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ChangeEdit', params: {changeId: change.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(change)"
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
            <span slot="modal-title"><span id="leafClient3App.change.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-change-heading" >Are you sure you want to delete this Change?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-change" v-on:click="removeChange()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./change.component.ts">
</script>
