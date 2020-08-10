<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.lineOfBusiness.home.createOrEditLabel">Create or edit a LineOfBusiness</h2>
                <div>
                    <div class="form-group" v-if="lineOfBusiness.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="lineOfBusiness.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="line-of-business-name">Name</label>
                        <input type="text" class="form-control" name="name" id="line-of-business-name"
                            :class="{'valid': !$v.lineOfBusiness.name.$invalid, 'invalid': $v.lineOfBusiness.name.$invalid }" v-model="$v.lineOfBusiness.name.$model"  required/>
                        <div v-if="$v.lineOfBusiness.name.$anyDirty && $v.lineOfBusiness.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.lineOfBusiness.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="line-of-business-oraganizationalUnit">Oraganizational Unit</label>
                        <select class="form-control" id="line-of-business-oraganizationalUnit" name="oraganizationalUnit" v-model="lineOfBusiness.oraganizationalUnit">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="lineOfBusiness.oraganizationalUnit && oraganizationalUnitOption.id === lineOfBusiness.oraganizationalUnit.id ? lineOfBusiness.oraganizationalUnit : oraganizationalUnitOption" v-for="oraganizationalUnitOption in oraganizationalUnits" :key="oraganizationalUnitOption.id">{{oraganizationalUnitOption.id}} -{{oraganizationalUnitOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="line-of-business-employee">Employee</label>
                        <select class="form-control" id="line-of-business-employee" name="employee" v-model="lineOfBusiness.employee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="lineOfBusiness.employee && employeeOption.id === lineOfBusiness.employee.id ? lineOfBusiness.employee : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id"> {{employeeOption.employeeId}}- {{employeeOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.lineOfBusiness.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./line-of-business-update.component.ts">
</script>
