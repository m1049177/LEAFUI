<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.change.home.createOrEditLabel">Create or edit a Change</h2>
                <div>
                    <div class="form-group" v-if="change.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="change.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="change-description">Description</label>
                        <input type="text" class="form-control" name="description" id="change-description"
                            :class="{'valid': !$v.change.description.$invalid, 'invalid': $v.change.description.$invalid }" v-model="$v.change.description.$model"  required/>
                        <div v-if="$v.change.description.$anyDirty && $v.change.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.change.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="change-dateOfChange">Date Of Change</label>
                        <div class="input-group">
                            <input id="change-dateOfChange" type="date" class="form-control" name="dateOfChange"  :class="{'valid': !$v.change.dateOfChange.$invalid, 'invalid': $v.change.dateOfChange.$invalid }"
                            v-model="$v.change.dateOfChange.$model"  required />
                        </div>
                        <div v-if="$v.change.dateOfChange.$anyDirty && $v.change.dateOfChange.$invalid">
                            <small class="form-text text-danger" v-if="!$v.change.dateOfChange.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="change-application">Application</label>
                        <select class="form-control" id="change-application" name="application" v-model="change.application">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="change.application && applicationOption.id === change.application.id ? change.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.change.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./change-update.component.ts">
</script>
