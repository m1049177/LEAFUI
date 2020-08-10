<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.expenditure.home.createOrEditLabel">Create or edit a Expenditure</h2>
                <div>
                    <div class="form-group" v-if="expenditure.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="expenditure.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="expenditure-expenditureType">Expenditure Type</label>
                        <select class="form-control" name="expenditureType" :class="{'valid': !$v.expenditure.expenditureType.$invalid, 'invalid': $v.expenditure.expenditureType.$invalid }" v-model="$v.expenditure.expenditureType.$model" id="expenditure-expenditureType"  required>
                            <option v-bind:value="type" v-for="type in spendType" :key="type.id" >{{type}}</option>
                            <!-- <option value="SUPPORTCOST" >SUPPORTCOST</option>
                            <option value="MISCELLANEOUS" >MISCELLANEOUS</option> -->
                        </select>
                        <div v-if="$v.expenditure.expenditureType.$anyDirty && $v.expenditure.expenditureType.$invalid">
                            <small class="form-text text-danger" v-if="!$v.expenditure.expenditureType.required">
                                This field is required.
                            </small>
                        </div>
                    </div>                   
                    <div class="form-group">
                        <label class="form-control-label" for="expenditure-description">Description</label>
                        <input type="text" class="form-control" name="description" id="expenditure-description"
                            :class="{'valid': !$v.expenditure.description.$invalid, 'invalid': $v.expenditure.description.$invalid }" v-model="$v.expenditure.description.$model"  required/>
                        <div v-if="$v.expenditure.description.$anyDirty && $v.expenditure.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.expenditure.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="expenditure-startDate">Start Date</label>
                        <div class="input-group">
                            <input id="expenditure-startDate" type="date" class="form-control" name="startDate"  :class="{'valid': !$v.expenditure.startDate.$invalid, 'invalid': $v.expenditure.startDate.$invalid }"
                            v-model="$v.expenditure.startDate.$model"  required />
                        </div>
                        <div v-if="$v.expenditure.startDate.$anyDirty && $v.expenditure.startDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.expenditure.startDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="expenditure-endDate">End Date</label>
                        <div class="input-group">
                            <input id="expenditure-endDate" type="date" class="form-control" name="endDate"  :class="{'valid': !$v.expenditure.endDate.$invalid, 'invalid': $v.expenditure.endDate.$invalid }"
                            v-model="$v.expenditure.endDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="expenditure-application">Application</label>
                        <select class="form-control" id="expenditure-application" name="application" v-model="expenditure.application" required>
                            <option v-if="!expenditure.application" v-bind:value="null" selected></option>
                            <option v-bind:value="expenditure.application && applicationOption.id === expenditure.application.id ? expenditure.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.expenditure.application.$anyDirty && $v.expenditure.application.$invalid">
                        <small class="form-text text-danger" v-if="!$v.expenditure.application.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.expenditure.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./expenditure-update.component.ts">
</script>
