<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.technologyRecommendation.home.createOrEditLabel">Create or edit a TechnologyRecommendation</h2>
                <div>
                    <div class="form-group" v-if="technologyRecommendation.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="technologyRecommendation.id" readonly />
                    </div>
                              <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-technologyName">Technology Name</label>
                        <input type="text" class="form-control" name="technologyName" id="technology-recommendation-technologyName"
                            :class="{'valid': !$v.technologyRecommendation.technologyName.$invalid, 'invalid': $v.technologyRecommendation.technologyName.$invalid }" v-model="$v.technologyRecommendation.technologyName.$model"  required/>
                        <div v-if="$v.technologyRecommendation.technologyName.$anyDirty && $v.technologyRecommendation.technologyName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyRecommendation.technologyName.required">
                                This field is required. 
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-outdatedVersion">Outdated Version</label> 
                        <input type="text" class="form-control" name="outdatedVersion" id="technology-recommendation-outdatedVersion"
                            :class="{'valid': !$v.technologyRecommendation.outdatedVersion.$invalid, 'invalid': $v.technologyRecommendation.outdatedVersion.$invalid && !$v.technologyRecommendation.outdatedVersion.numberValidation }" v-model="$v.technologyRecommendation.outdatedVersion.$model"  required/>
                        <div v-if="$v.technologyRecommendation.outdatedVersion.$anyDirty && $v.technologyRecommendation.outdatedVersion.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyRecommendation.outdatedVersion.required">
                                This field is required. Check the decimal points
                            </small>
                             <!-- <p class="error" v-if="!$v.technologyRecommendation.stableVersion.numberValidation">Please check your input.</p> -->
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-stableVersion">Stable Version</label> 
                        <input type="text" class="form-control" name="stableVersion" id="technology-recommendation-stableVersion"
                            :class="{'valid': !$v.technologyRecommendation.stableVersion.$invalid, 'invalid': $v.technologyRecommendation.stableVersion.$invalid && !$v.technologyRecommendation.stableVersion.numberValidation }" v-model="$v.technologyRecommendation.stableVersion.$model"  required/>
                        <div v-if="$v.technologyRecommendation.stableVersion.$anyDirty && $v.technologyRecommendation.stableVersion.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyRecommendation.stableVersion.required">
                                This field is required. Check the decimal points
                            </small>
                             <!-- <p class="error" v-if="!$v.technologyRecommendation.stableVersion.numberValidation">Please check your input.</p> -->
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-latestVersion">Latest Version</label>
                        <input type="text" class="form-control" name="latestVersion" id="technology-recommendation-latestVersion"
                            :class="{'valid': !$v.technologyRecommendation.latestVersion.$invalid, 'invalid': $v.technologyRecommendation.latestVersion.$invalid && !$v.technologyRecommendation.latestVersion.numberValidation}" v-model="$v.technologyRecommendation.latestVersion.$model" />
                            <!-- <p class="error" v-if="!$v.technologyRecommendation.latestVersion.numberValidation">Please check your input.</p> -->
                        <div v-if="$v.technologyRecommendation.latestVersion.$anyDirty && $v.technologyRecommendation.latestVersion.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyRecommendation.latestVersion.required">
                                This field is required. Check the decimal points
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-newFeatures">New Features</label>
                        <input type="text" class="form-control" name="newFeatures" id="technology-recommendation-newFeatures"
                            :class="{'valid': !$v.technologyRecommendation.newFeatures.$invalid, 'invalid': $v.technologyRecommendation.newFeatures.$invalid }" v-model="$v.technologyRecommendation.newFeatures.$model" />
                            
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" for="technology-recommendation-technologyType">Technology Type</label>
                        <select class="form-control" name="technologyType" :class="{'valid': !$v.technologyRecommendation.technologyType.$invalid, 'invalid': $v.technologyRecommendation.technologyType.$invalid }" v-model="$v.technologyRecommendation.technologyType.$model" id="technology-recommendation-technologyType" >
                             <option  v-for="type in label.label_data" :key='type.id' v-bind:value='type.name' >{{type.name}}</option>
                        </select>
                    </div>
                </div>
            
                <div>
                   <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.technologyRecommendation.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./technology-recommendation-update.component.ts">
</script>
