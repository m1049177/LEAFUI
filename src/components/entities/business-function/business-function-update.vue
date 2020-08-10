<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.businessFunction.home.createOrEditLabel">Create or edit a BusinessFunction</h2>
                <div>
                    <div class="form-group" v-if="businessFunction.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="businessFunction.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-function-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.businessFunction.type.$invalid, 'invalid': $v.businessFunction.type.$invalid }" v-model="$v.businessFunction.type.$model" id="business-function-type"  required>
                            <option value="Primary" >Primary</option>
                            <option value="Support" >Support</option>
                        </select>
                        <div v-if="$v.businessFunction.type.$anyDirty && $v.businessFunction.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.businessFunction.type.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-function-name">Name</label>
                        <input type="text" class="form-control" name="name" id="business-function-name"
                            :class="{'valid': !$v.businessFunction.name.$invalid, 'invalid': $v.businessFunction.name.$invalid }" v-model="$v.businessFunction.name.$model"  required/>
                        <div v-if="$v.businessFunction.name.$anyDirty && $v.businessFunction.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.businessFunction.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="business-function-lineOfBusiness">Line Of Business</label>
                        <select class="form-control" id="business-function-lineOfBusiness" name="lineOfBusiness" v-model="businessFunction.lineOfBusiness">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="businessFunction.lineOfBusiness && lineOfBusinessOption.id === businessFunction.lineOfBusiness.id ? businessFunction.lineOfBusiness : lineOfBusinessOption" v-for="lineOfBusinessOption in lineOfBusinesses" :key="lineOfBusinessOption.id">{{lineOfBusinessOption.id}} - {{lineOfBusinessOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="business-function-employee">Employee</label>
                        <select class="form-control" id="business-function-employee" name="employee" v-model="businessFunction.employee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="businessFunction.employee && employeeOption.id === businessFunction.employee.id ? businessFunction.employee : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.employeeId}} - {{employeeOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.businessFunction.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./business-function-update.component.ts">
</script>
