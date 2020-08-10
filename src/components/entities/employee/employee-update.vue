<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.employee.home.createOrEditLabel">Create or edit a Employee</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-employeeId">Employee Id</label>
                        <input type="text" class="form-control" name="employeeId" id="employee-employeeId"
                            :class="{'valid': !$v.employee.employeeId.$invalid, 'invalid': $v.employee.employeeId.$invalid }" v-model="$v.employee.employeeId.$model"  required/>
                        <div v-if="$v.employee.employeeId.$anyDirty && $v.employee.employeeId.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.employeeId.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-name">Name</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model"  required/>
                        <div v-if="$v.employee.name.$anyDirty && $v.employee.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-dateOfJoining">Date Of Joining</label>
                        <div class="input-group">
                            <input id="employee-dateOfJoining" type="date" class="form-control" name="dateOfJoining"  :class="{'valid': !$v.employee.dateOfJoining.$invalid, 'invalid': $v.employee.dateOfJoining.$invalid }"
                            v-model="$v.employee.dateOfJoining.$model"  required />
                        </div>
                        <div v-if="$v.employee.dateOfJoining.$anyDirty && $v.employee.dateOfJoining.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.dateOfJoining.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-gender">Gender</label>
                        <select class="form-control" name="gender" :class="{'valid': !$v.employee.gender.$invalid, 'invalid': $v.employee.gender.$invalid }" v-model="$v.employee.gender.$model" id="employee-gender"  required>
                            <option value="Male" >Male</option>
                            <option value="Female" >Female</option>
                        </select>
                        <div v-if="$v.employee.gender.$anyDirty && $v.employee.gender.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.gender.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-address">Address</label>
                        <input type="text" class="form-control" name="address" id="employee-address"
                            :class="{'valid': !$v.employee.address.$invalid, 'invalid': $v.employee.address.$invalid }" v-model="$v.employee.address.$model"  required/>
                        <div v-if="$v.employee.address.$anyDirty && $v.employee.address.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.address.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="employee-designation">Designation</label>
                        <input type="text" class="form-control" name="designation" id="employee-designation"
                            :class="{'valid': !$v.employee.designation.$invalid, 'invalid': $v.employee.designation.$invalid }" v-model="$v.employee.designation.$model"  required/>
                        <div v-if="$v.employee.designation.$anyDirty && $v.employee.designation.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.designation.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.employee.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
