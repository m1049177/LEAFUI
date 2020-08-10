<template>
    <div>
        <h2 id="page-heading">
            <span id="technology-stack-heading">Technology Stacks</span>
            <router-link :to="{name: 'TechnologyStackCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-technology-stack">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new TechnologyStack
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
        <div class="alert alert-warning" v-if="!isFetching && technologyStacks && technologyStacks.length === 0">
            <span>No technologyStacks found</span>
        </div>
        <div class="table-responsive" v-if="technologyStacks && technologyStacks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Type</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="technologyStack in technologyStacks"
                    :key="technologyStack.id">
                    <td>
                        <router-link :to="{name: 'TechnologyStackView', params: {technologyStackId: technologyStack.id}}">{{technologyStack.id}}</router-link>
                    </td>
                    <td>{{technologyStack.name}}</td>
                    <td>{{technologyStack.type}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'TechnologyStackView', params: {technologyStackId: technologyStack.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TechnologyStackEdit', params: {technologyStackId: technologyStack.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(technologyStack)"
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
            <span slot="modal-title"><span id="leafClient3App.technologyStack.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-technologyStack-heading" >Are you sure you want to delete this Technology Stack?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-technologyStack" v-on:click="removeTechnologyStack()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./technology-stack.component.ts">
</script>
