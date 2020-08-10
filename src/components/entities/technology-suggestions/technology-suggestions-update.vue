<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.technologySuggestions.home.createOrEditLabel">Create or edit a TechnologySuggestions</h2>
                <div>
                    <div class="form-group" v-if="technologySuggestions.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="technologySuggestions.id" readonly />
                    </div>
                      <div class="form-group">
                        <label class="form-control-label"  for="technology-suggestions-technologyRecommendation">Technology Recommendation</label>
                        <select class="form-control" id="technology-suggestions-technologyRecommendation" name="technologyRecommendation" v-model="technologySuggestions.technologyRecommendation">
                            <option v-bind:value="technologySuggestions.technologyRecommendation && technologyRecommendationOption.id === technologySuggestions.technologyRecommendation.id ? technologySuggestions.technologyRecommendation : technologyRecommendationOption" v-for="technologyRecommendationOption in technologyRecommendations" :key="technologyRecommendationOption.id">{{technologyRecommendationOption.technologyName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-suggestions-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.technologySuggestions.type.$invalid, 'invalid': $v.technologySuggestions.type.$invalid }" v-model="$v.technologySuggestions.type.$model" id="technology-suggestions-type" >
                            <option value="RISK" >RISK</option>
                            <option value="WARNING" >WARNING</option>
                            <option value="UPGRADATION" >UPGRADATION</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-suggestions-version">Version</label>
                        <input type="text" class="form-control" name="version" id="technology-suggestions-version"
                            :class="{'valid': !$v.technologySuggestions.version.$invalid, 'invalid': $v.technologySuggestions.version.$invalid }" v-model="$v.technologySuggestions.version.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-suggestions-description">Description</label>
                               <b-form-textarea class="form-control" name="description" id="technology-suggestions-description"
                                   :class="{'valid': !$v.technologySuggestions.description.$invalid, 'invalid': $v.technologySuggestions.description.$invalid }" v-model="$v.technologySuggestions.description.$model"  
                                    rows="2" max-rows="7"></b-form-textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-suggestions-suggestion">Suggestion</label>
                        <input type="text" class="form-control" name="suggestion" id="technology-suggestions-suggestion"
                            :class="{'valid': !$v.technologySuggestions.suggestion.$invalid, 'invalid': $v.technologySuggestions.suggestion.$invalid }" v-model="$v.technologySuggestions.suggestion.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.technologySuggestions.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./technology-suggestions-update.component.ts">
</script>
