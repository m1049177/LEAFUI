<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.activity.home.createOrEditLabel">Create or edit a Activity</h2>
                <div>
                    <div class="form-group" v-if="activity.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="activity.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="activity-name">Name</label>
                        <input type="text" class="form-control" name="name" id="activity-name"
                            :class="{'valid': !$v.activity.name.$invalid, 'invalid': $v.activity.name.$invalid }" v-model="$v.activity.name.$model"  required/>
                        <div v-if="$v.activity.name.$anyDirty && $v.activity.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.activity.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="activity-description">Description</label>
                        <input type="text" class="form-control" name="description" id="activity-description"
                            :class="{'valid': !$v.activity.description.$invalid, 'invalid': $v.activity.description.$invalid }" v-model="$v.activity.description.$model"  required/>
                        <div v-if="$v.activity.description.$anyDirty && $v.activity.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.activity.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="activity-resourcesRequired">Resources Required</label>
                        <select class="form-control" name="resourcesRequired" :class="{'valid': !$v.activity.resourcesRequired.$invalid, 'invalid': $v.activity.resourcesRequired.$invalid }" v-model="$v.activity.resourcesRequired.$model" id="activity-resourcesRequired"  required>
                            <option value="People" >People</option>
                            <option value="ITSystems" >ITSystems</option>
                            <option value="Finance" >Finance</option>
                        </select>
                        <div v-if="$v.activity.resourcesRequired.$anyDirty && $v.activity.resourcesRequired.$invalid">
                            <small class="form-text text-danger" v-if="!$v.activity.resourcesRequired.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="activity-businessProcess">Business Process</label>
                        <select class="form-control" id="activity-businessProcess" name="businessProcess" v-model="activity.businessProcess">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="activity.businessProcess && businessProcessOption.id === activity.businessProcess.id ? activity.businessProcess : businessProcessOption" v-for="businessProcessOption in businessProcesses" :key="businessProcessOption.id">{{businessProcessOption.id}}- {{businessProcessOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.activity.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./activity-update.component.ts">
</script>
