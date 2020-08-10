<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.integration.home.createOrEditLabel">Create or edit a Integration</h2>
                <div>
                    <div class="form-group" v-if="integration.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="integration.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="integration-application">Application</label>
                        <select class="form-control" id="integration-application" name="application" v-model="integration.application">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="integration.application && applicationOption.id === integration.application.id ? integration.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="integration-flowType">Flow Type</label>
                        <select class="form-control" name="flowType" :class="{'valid': !$v.integration.flowType.$invalid, 'invalid': $v.integration.flowType.$invalid }" v-model="$v.integration.flowType.$model" id="integration-flowType"  required>
                            <option value="INBOUND" >INBOUND</option>
                            <option value="OUTBOUND" >OUTBOUND</option>
                            <option value="BIDIRECTIONAL" >BIDIRECTIONAL</option>
                        </select>
                        <div v-if="$v.integration.flowType.$anyDirty && $v.integration.flowType.$invalid">
                            <small class="form-text text-danger" v-if="!$v.integration.flowType.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="integration-entity">Entity</label>
                        <input type="text" class="form-control" name="entity" id="integration-entity"
                            :class="{'valid': !$v.integration.entity.$invalid, 'invalid': $v.integration.entity.$invalid }" v-model="$v.integration.entity.$model"  required/>
                        <div v-if="$v.integration.entity.$anyDirty && $v.integration.entity.$invalid">
                            <small class="form-text text-danger" v-if="!$v.integration.entity.required">
                                This field is required.
                            </small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label"  for="integration-integrationApp">Integration App</label>
                        <select class="form-control" id="integration-integrationApp" name="integrationApp" v-model="integration.integrationApp" required>
                            <option v-if="!integration.integrationApp" v-bind:value="null" selected></option>
                            <option v-bind:value="integration.integrationApp && applicationOption.id === integration.integrationApp.id ? integration.integrationApp : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.integration.integrationApp.$anyDirty && $v.integration.integrationApp.$invalid">
                        <small class="form-text text-danger" v-if="!$v.integration.integrationApp.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.integration.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./integration-update.component.ts">
</script>
