<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.businessProcess.home.createOrEditLabel">Create or edit a BusinessProcess</h2>
                <div>
                    <div class="form-group" v-if="businessProcess.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="businessProcess.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-process-name">Name</label>
                        <input type="text" class="form-control" name="name" id="business-process-name"
                            :class="{'valid': !$v.businessProcess.name.$invalid, 'invalid': $v.businessProcess.name.$invalid }" v-model="$v.businessProcess.name.$model"  required/>
                        <div v-if="$v.businessProcess.name.$anyDirty && $v.businessProcess.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.businessProcess.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-process-startDate">Start Date</label>
                        <div class="input-group">
                            <input id="business-process-startDate" type="date" class="form-control" name="startDate"  :class="{'valid': !$v.businessProcess.startDate.$invalid, 'invalid': $v.businessProcess.startDate.$invalid }"
                            v-model="$v.businessProcess.startDate.$model"  required />
                        </div>
                        <div v-if="$v.businessProcess.startDate.$anyDirty && $v.businessProcess.startDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.businessProcess.startDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-process-expectedEndDate">Expected End Date</label>
                        <div class="input-group">
                            <input id="business-process-expectedEndDate" type="date" class="form-control" name="expectedEndDate"  :class="{'valid': !$v.businessProcess.expectedEndDate.$invalid, 'invalid': $v.businessProcess.expectedEndDate.$invalid }"
                            v-model="$v.businessProcess.expectedEndDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-process-endDate">End Date</label>
                        <div class="input-group">
                            <input id="business-process-endDate" type="date" class="form-control" name="endDate"  :class="{'valid': !$v.businessProcess.endDate.$invalid, 'invalid': $v.businessProcess.endDate.$invalid }"
                            v-model="$v.businessProcess.endDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="business-process-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.businessProcess.status.$invalid, 'invalid': $v.businessProcess.status.$invalid }" v-model="$v.businessProcess.status.$model" id="business-process-status"  required>
                            <option value="Completed" >Completed</option>
                            <option value="InProgress" >InProgress</option>
                            <option value="Started" >Started</option>
                        </select>
                        <div v-if="$v.businessProcess.status.$anyDirty && $v.businessProcess.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.businessProcess.status.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="business-process-capabilities">Capabilities</label>
                        <select class="form-control" id="business-process-capabilities" name="capabilities" v-model="businessProcess.capabilities">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="businessProcess.capabilities && capabilitiesOption.id === businessProcess.capabilities.id ? businessProcess.capabilities : capabilitiesOption" v-for="capabilitiesOption in capabilities" :key="capabilitiesOption.id">{{capabilitiesOption.description}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.businessProcess.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./business-process-update.component.ts">
</script>
