<template>
    <div>
        <h2 id="page-heading">
            <span id="technology-recommendation-heading">Technology Recommendations</span>
            <router-link :to="{name: 'TechnologyRecommendationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-technology-recommendation">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new TechnologyRecommendation
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
        <div class="alert alert-warning" v-if="!isFetching && technologyRecommendations && technologyRecommendations.length === 0">
            <span>No technologyRecommendations found</span>
        </div>
        <div class="table-responsive" v-if="technologyRecommendations && technologyRecommendations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Technology Name</span></th>
                    <th><span>Outdated Version</span></th>
                    <th><span>Stable Version</span></th>
                    <th><span>Latest Version</span></th>
                    <th><span>New Features</span></th>
                    <th><span>Technology Type</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="technologyRecommendation in technologyRecommendations"
                    :key="technologyRecommendation.id">
                    <td>
                        <router-link :to="{name: 'TechnologyRecommendationView', params: {technologyRecommendationId: technologyRecommendation.id}}">{{technologyRecommendation.id}}</router-link>
                    </td>
                    <td>{{technologyRecommendation.technologyName}}</td>
                    <td>{{technologyRecommendation.outdatedVersion}}</td>
                    <td>{{technologyRecommendation.stableVersion}}</td>
                    <td>{{technologyRecommendation.latestVersion}}</td>
                    <td>{{technologyRecommendation.newFeatures}}</td>
                    <td>{{technologyRecommendation.technologyType}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'TechnologyRecommendationView', params: {technologyRecommendationId: technologyRecommendation.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TechnologyRecommendationEdit', params: {technologyRecommendationId: technologyRecommendation.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(technologyRecommendation)"
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
            <span slot="modal-title"><span id="leafClient3App.technologyRecommendation.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-technologyRecommendation-heading" >Are you sure you want to delete this Technology Recommendation?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-technologyRecommendation" v-on:click="removeTechnologyRecommendation()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./technology-recommendation.component.ts">
</script>
