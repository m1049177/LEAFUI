<template>
    <div>
        <h2 id="page-heading">
            <span id="example-heading">Examples</span>
            <router-link :to="{name: 'ExampleCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-example">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Example
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
        <div class="alert alert-warning" v-if="!isFetching && examples && examples.length === 0">
            <span>No examples found</span>
        </div>
        <div class="table-responsive" v-if="examples && examples.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="example in examples"
                    :key="example.id">
                    <td>
                        <router-link :to="{name: 'ExampleView', params: {exampleId: example.id}}">{{example.id}}</router-link>
                    </td>
                    <td>{{example.name}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ExampleView', params: {exampleId: example.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ExampleEdit', params: {exampleId: example.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(example)"
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
            <span slot="modal-title"><span id="leafClient3App.example.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-example-heading" >Are you sure you want to delete this Example?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-example" v-on:click="removeExample()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./example.component.ts">
</script>
