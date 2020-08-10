<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.application.home.createOrEditLabel">Create or edit a Application</h2>
                <div>
                    <div class="form-group" v-if="application.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="application.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="application-name">Name</label>
                        <input type="text" class="form-control" name="name" id="application-name"
                            :class="{'valid': !$v.application.name.$invalid, 'invalid': $v.application.name.$invalid }" v-model="$v.application.name.$model"  required/>
                        <div v-if="$v.application.name.$anyDirty && $v.application.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.application.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="application-description">Description</label>
                        <input type="text" class="form-control" name="description" id="application-description"
                            :class="{'valid': !$v.application.description.$invalid, 'invalid': $v.application.description.$invalid }" v-model="$v.application.description.$model"  required/>
                        <div v-if="$v.application.description.$anyDirty && $v.application.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.application.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="application-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.application.type.$invalid, 'invalid': $v.application.type.$invalid }" v-model="$v.application.type.$model" id="application-type"  required>
                            <option value="WebApplication" >WebApplication</option>
                            <option value="WindowsApplication" >WindowsApplication</option>
                            <option value="ReportingApplication" >ReportingApplication</option>
                            <option value="NativeMobileApp" >NativeMobileApp</option>
                            <option value="ConsoleApplication" >ConsoleApplication</option>
                            <option value="ERP" >ERP</option>
                            <option value="IntegrationTool" >IntegrationTool</option>
                        </select>
                        <div v-if="$v.application.type.$anyDirty && $v.application.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.application.type.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="application-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.application.status.$invalid, 'invalid': $v.application.status.$invalid }" v-model="$v.application.status.$model" id="application-status" >
                            <option value="Running" >Running</option>
                            <option value="InProgress" >InProgress</option>
                            <option value="Halted" >Halted</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="application-implementationDate">Implementation Date</label>
                        <div class="input-group">
                            <input id="application-implementationDate" type="date" class="form-control" name="implementationDate"  :class="{'valid': !$v.application.implementationDate.$invalid, 'invalid': $v.application.implementationDate.$invalid }"
                            v-model="$v.application.implementationDate.$model"  required />
                        </div>
                        <div v-if="$v.application.implementationDate.$anyDirty && $v.application.implementationDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.application.implementationDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="application-lineOfBusiness">Line Of Business</label>
                        <select class="form-control" id="application-lineOfBusiness" name="lineOfBusiness" v-model="application.lineOfBusiness">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="application.lineOfBusiness && lineOfBusinessOption.id === application.lineOfBusiness.id ? application.lineOfBusiness : lineOfBusinessOption" v-for="lineOfBusinessOption in lineOfBusinesses" :key="lineOfBusinessOption.id">{{lineOfBusinessOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.application.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./application-update.component.ts">
</script>
