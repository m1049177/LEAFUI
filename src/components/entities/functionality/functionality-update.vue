<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.functionality.home.createOrEditLabel">Create or edit a Functionality</h2>
                <div>
                    <div class="form-group" v-if="functionality.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="functionality.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="functionality-name">Name</label>
                        <input type="text" class="form-control" name="name" id="functionality-name"
                            :class="{'valid': !$v.functionality.name.$invalid, 'invalid': $v.functionality.name.$invalid }" v-model="$v.functionality.name.$model"  required/>
                        <div v-if="$v.functionality.name.$anyDirty && $v.functionality.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.functionality.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="functionality-majorModules">Major Modules</label>
                        <input type="text" class="form-control" name="majorModules" id="functionality-majorModules"
                            :class="{'valid': !$v.functionality.majorModules.$invalid, 'invalid': $v.functionality.majorModules.$invalid }" v-model="$v.functionality.majorModules.$model"  required/>
                        <div v-if="$v.functionality.majorModules.$anyDirty && $v.functionality.majorModules.$invalid">
                            <small class="form-text text-danger" v-if="!$v.functionality.majorModules.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="functionality-application">Application</label>
                        <select class="form-control" id="functionality-application" name="application" v-model="functionality.application">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="functionality.application && applicationOption.id === functionality.application.id ? functionality.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.functionality.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./functionality-update.component.ts">
</script>
