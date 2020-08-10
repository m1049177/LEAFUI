<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.task.home.createOrEditLabel">Create or edit a Task</h2>
                <div>
                    <div class="form-group" v-if="task.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="task.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="task-name">Name</label>
                        <input type="text" class="form-control" name="name" id="task-name"
                            :class="{'valid': !$v.task.name.$invalid, 'invalid': $v.task.name.$invalid }" v-model="$v.task.name.$model"  required/>
                        <div v-if="$v.task.name.$anyDirty && $v.task.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.task.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="task-estimatedCost">Estimated Cost</label>
                        <input type="number" class="form-control" name="estimatedCost" id="task-estimatedCost"
                            :class="{'valid': !$v.task.estimatedCost.$invalid, 'invalid': $v.task.estimatedCost.$invalid }" v-model.number="$v.task.estimatedCost.$model"  required/>
                        <div v-if="$v.task.estimatedCost.$anyDirty && $v.task.estimatedCost.$invalid">
                            <small class="form-text text-danger" v-if="!$v.task.estimatedCost.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.task.estimatedCost.number">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="task-successor">Successor</label>
                        <select class="form-control" name="successor" :class="{'valid': !$v.task.successor.$invalid, 'invalid': $v.task.successor.$invalid }" v-model="$v.task.successor.$model" id="task-successor"  required>
                            <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                            <option value="K" >K</option>
                            <option value="M" >M</option>
                            <option value="B" >B</option>
                        </select>
                        <div v-if="$v.task.successor.$anyDirty && $v.task.successor.$invalid">
                            <small class="form-text text-danger" v-if="!$v.task.successor.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="task-activity">Activity</label>
                        <select class="form-control" id="task-activity" name="activity" v-model="task.activity">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="task.activity && activityOption.id === task.activity.id ? task.activity : activityOption" v-for="activityOption in activities" :key="activityOption.id">{{activityOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="task-employee">Employee</label>
                        <select class="form-control" id="task-employee" name="employee" v-model="task.employee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="task.employee && employeeOption.id === task.employee.id ? task.employee : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.employeeId}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.task.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./task-update.component.ts">
</script>
