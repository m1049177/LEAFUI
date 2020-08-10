<template>
    <div>
        <h2 id="page-heading">
            <span id="diagram-heading">Diagrams</span>
            <router-link :to="{name: 'DiagramCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-diagram">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Diagram
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
        <div class="alert alert-warning" v-if="!isFetching && diagrams && diagrams.length === 0">
            <span>No diagrams found</span>
        </div>
        <div class="table-responsive" v-if="diagrams && diagrams.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Category</span></th>
                    <th><span>Picture</span></th>
                    <th><span>Company</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="diagram in diagrams"
                    :key="diagram.id">
                    <td>
                        <router-link :to="{name: 'DiagramView', params: {diagramId: diagram.id}}">{{diagram.id}}</router-link>
                    </td>
                    <td>{{diagram.category}}</td>
                    <td>
                        <a v-if="diagram.picture" v-on:click="openFile(diagram.pictureContentType, diagram.picture)">
                            <img v-bind:src="'data:' + diagram.pictureContentType + ';base64,' + diagram.picture" style="max-height: 30px;" alt="diagram image"/>
                        </a>
                        <span v-if="diagram.picture">{{diagram.pictureContentType}}, {{byteSize(diagram.picture)}}</span>
                    </td>
                    <td>
                        <div v-if="diagram.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: diagram.company.id}}">{{diagram.company.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'DiagramView', params: {diagramId: diagram.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'DiagramEdit', params: {diagramId: diagram.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(diagram)"
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
            <span slot="modal-title"><span id="leafClient3App.diagram.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-diagram-heading" >Are you sure you want to delete this Diagram?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-diagram" v-on:click="removeDiagram()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./diagram.component.ts">
</script>
