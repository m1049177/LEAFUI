<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.maintenance.home.createOrEditLabel">Create or edit a Maintenance</h2>
                <div>
                    <div class="form-group" v-if="maintenance.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="maintenance.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="maintenance-startDate">Start Date</label>
                        <div class="input-group">
                            <input id="maintenance-startDate" type="date" class="form-control" name="startDate"  :class="{'valid': !$v.maintenance.startDate.$invalid, 'invalid': $v.maintenance.startDate.$invalid }"
                            v-model="$v.maintenance.startDate.$model"  required />
                        </div>
                        <div v-if="$v.maintenance.startDate.$anyDirty && $v.maintenance.startDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.maintenance.startDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="maintenance-endDate">End Date</label>
                        <div class="input-group">
                            <input id="maintenance-endDate" type="date" class="form-control" name="endDate"  :class="{'valid': !$v.maintenance.endDate.$invalid, 'invalid': $v.maintenance.endDate.$invalid }"
                            v-model="$v.maintenance.endDate.$model"  required />
                        </div>
                        <div v-if="$v.maintenance.endDate.$anyDirty && $v.maintenance.endDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.maintenance.endDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="maintenance-application">Application</label>
                        <select class="form-control" id="maintenance-application" name="application" v-model="maintenance.application">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="maintenance.application && applicationOption.id === maintenance.application.id ? maintenance.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.maintenance.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./maintenance-update.component.ts">
</script>
