<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.report.home.createOrEditLabel">Create or edit a Report</h2>
                <div>
                    <div class="form-group" v-if="report.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="report.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="report-name">Name</label>
                        <input type="text" class="form-control" name="name" id="report-name"
                            :class="{'valid': !$v.report.name.$invalid, 'invalid': $v.report.name.$invalid }" v-model="$v.report.name.$model"  required/>
                        <div v-if="$v.report.name.$anyDirty && $v.report.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.report.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="report-type">Type</label>
                        <input type="text" class="form-control" name="type" id="report-type"
                            :class="{'valid': !$v.report.type.$invalid, 'invalid': $v.report.type.$invalid }" v-model="$v.report.type.$model"  required/>
                        <div v-if="$v.report.type.$anyDirty && $v.report.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.report.type.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="report-reportingTool">Reporting Tool</label>
                        <input type="text" class="form-control" name="reportingTool" id="report-reportingTool"
                            :class="{'valid': !$v.report.reportingTool.$invalid, 'invalid': $v.report.reportingTool.$invalid }" v-model="$v.report.reportingTool.$model"  required/>
                        <div v-if="$v.report.reportingTool.$anyDirty && $v.report.reportingTool.$invalid">
                            <small class="form-text text-danger" v-if="!$v.report.reportingTool.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="report-application">Application</label>
                        <select class="form-control" id="report-application" name="application" v-model="report.application">
                            <option v-bind:value="report.application && applicationOption.id === report.application.id ? report.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.report.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./report-update.component.ts">
</script>
