<template>
    <div>
        <h2 id="page-heading">
            <span id="technology-suggestions-heading">Technology Suggestions</span>
            <router-link :to="{name: 'TechnologySuggestionsCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-technology-suggestions">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new TechnologySuggestions
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
        <div class="alert alert-warning" v-if="!isFetching && technologySuggestions && technologySuggestions.length === 0">
            <span>No technologySuggestions found</span>
        </div>
        <div class="table-responsive" v-if="technologySuggestions && technologySuggestions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Type</span></th>
                    <th><span>Version</span></th>
                    <th><span>Description</span></th>
                    <th><span>Suggestion</span></th>
                    <th><span>Technology Recommendation</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="technologySuggestions in technologySuggestions"
                    :key="technologySuggestions.id">
                    <td>
                        <router-link :to="{name: 'TechnologySuggestionsView', params: {technologySuggestionsId: technologySuggestions.id}}">{{technologySuggestions.id}}</router-link>
                    </td>
                    <td>{{technologySuggestions.type}}</td>
                    <td>{{technologySuggestions.version}}</td>
                    <td>{{technologySuggestions.description}}</td>
                    <td>{{technologySuggestions.suggestion}}</td>
                    <td>
                        <div v-if="technologySuggestions.technologyRecommendation">
                            <router-link :to="{name: 'TechnologyRecommendationView', params: {technologyRecommendationId: technologySuggestions.technologyRecommendation.id}}">{{technologySuggestions.technologyRecommendation.technologyName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'TechnologySuggestionsView', params: {technologySuggestionsId: technologySuggestions.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TechnologySuggestionsEdit', params: {technologySuggestionsId: technologySuggestions.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(technologySuggestions)"
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
            <span slot="modal-title"><span id="leafClient3App.technologySuggestions.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-technologySuggestions-heading" >Are you sure you want to delete this Technology Suggestions?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-technologySuggestions" v-on:click="removeTechnologySuggestions()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./technology-suggestions.component.ts">
</script>
