<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.oraganizationalUnit.home.createOrEditLabel">Create or edit a OraganizationalUnit</h2>
                <div>
                    <div class="form-group" v-if="oraganizationalUnit.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="oraganizationalUnit.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="oraganizational-unit-name">Name</label>
                        <input type="text" class="form-control" name="name" id="oraganizational-unit-name"
                            :class="{'valid': !$v.oraganizationalUnit.name.$invalid, 'invalid': $v.oraganizationalUnit.name.$invalid }" v-model="$v.oraganizationalUnit.name.$model"  required/>
                        <div v-if="$v.oraganizationalUnit.name.$anyDirty && $v.oraganizationalUnit.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.oraganizationalUnit.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="oraganizational-unit-employee">Employee</label>
                        <select class="form-control" id="oraganizational-unit-employee" name="employee" v-model="oraganizationalUnit.employee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="oraganizationalUnit.employee && employeeOption.id === oraganizationalUnit.employee.id ? oraganizationalUnit.employee : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.employeeId}} - {{employeeOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="oraganizational-unit-company">Company</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="companies.companyName" readonly />
                        <!-- <select class="form-control" id="oraganizational-unit-company" name="company" v-model="oraganizationalUnit.company">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="oraganizationalUnit.company && companyOption.id === oraganizationalUnit.company.id ? oraganizationalUnit.company : companyOption" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select> -->
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.oraganizationalUnit.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./oraganizational-unit-update.component.ts">
</script>
