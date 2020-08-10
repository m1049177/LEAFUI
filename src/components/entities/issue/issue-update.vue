<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.issue.home.createOrEditLabel">Create or edit a Issue</h2>
                <div>
                    <div class="form-group" v-if="issue.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="issue.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="issue-description">Description</label>
                        <input type="text" class="form-control" name="description" id="issue-description"
                            :class="{'valid': !$v.issue.description.$invalid, 'invalid': $v.issue.description.$invalid }" v-model="$v.issue.description.$model"  required/>
                        <div v-if="$v.issue.description.$anyDirty && $v.issue.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.issue.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="issue-dateOfIssue">Date Of Issue</label>
                        <div class="input-group">
                            <input id="issue-dateOfIssue" type="date" class="form-control" name="dateOfIssue"  :class="{'valid': !$v.issue.dateOfIssue.$invalid, 'invalid': $v.issue.dateOfIssue.$invalid }"
                            v-model="$v.issue.dateOfIssue.$model"  required />
                        </div>
                        <div v-if="$v.issue.dateOfIssue.$anyDirty && $v.issue.dateOfIssue.$invalid">
                            <small class="form-text text-danger" v-if="!$v.issue.dateOfIssue.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="issue-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.issue.status.$invalid, 'invalid': $v.issue.status.$invalid }" v-model="$v.issue.status.$model" id="issue-status"  required>
                            <option value="Solved" >Solved</option>
                            <option value="Open" >Open</option>
                            <option value="InProgress" >InProgress</option>
                        </select>
                        <div v-if="$v.issue.status.$anyDirty && $v.issue.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.issue.status.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group" v-if="$v.issue.status.$model === 'Solved' ">
                        <label class="form-control-label" for="issue-solvedDate">Solved Date</label>
                        <div class="input-group">
                            <input id="issue-solvedDate" type="date" class="form-control" name="solvedDate" 
                            v-model="$v.issue.solvedDate.$model"   />
                        </div>
                        <!-- <div v-if="$v.issue.solvedDate.$anyDirty && $v.issue.solvedDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.issue.solvedDate.required">
                                This field is required.
                            </small>
                        </div> -->
                    </div>
                    <div class="form-group" v-if="$v.issue.status.$model === 'Solved' ">
                        <label class="form-control-label" for="issue-solvedBy">Solved By</label>
                        <input type="text" class="form-control" name="solvedBy" id="issue-solvedBy"
                            :class="{'valid': !$v.issue.solvedBy.$invalid, 'invalid': $v.issue.solvedBy.$invalid }" v-model="$v.issue.solvedBy.$model" />
                    </div>
                    <div class="form-group" v-if="$v.issue.status.$model === 'Solved' ">
                        <label class="form-control-label" for="issue-numberOfDays">Number Of Days</label>
                        <input type="number" class="form-control" name="numberOfDays" id="issue-numberOfDays"
                            :class="{'valid': !$v.issue.numberOfDays.$invalid, 'invalid': $v.issue.numberOfDays.$invalid }" v-model.number="$v.issue.numberOfDays.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="issue-typeOfIssue">Type Of Issue</label>
                        <select class="form-control" name="typeOfIssue" :class="{'valid': !$v.issue.typeOfIssue.$invalid, 'invalid': $v.issue.typeOfIssue.$invalid }" v-model="$v.issue.typeOfIssue.$model" id="issue-typeOfIssue"  required>
                            <option value="Critical" >Critical</option>
                            <option value="Normal" >Normal</option>
                            <option value="Major" >Major</option>
                        </select>
                        <div v-if="$v.issue.typeOfIssue.$anyDirty && $v.issue.typeOfIssue.$invalid">
                            <small class="form-text text-danger" v-if="!$v.issue.typeOfIssue.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="issue-application">Application</label>
                        <select class="form-control" id="issue-application" name="application" v-model="issue.application" :class="{'valid': !$v.issue.application.$invalid, 'invalid': $v.issue.application.$invalid }" required>
                            <option v-bind:value="null"></option>
                            <option v-bind:value="issue.application && applicationOption.id === issue.application.id ? issue.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.issue.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./issue-update.component.ts">
</script>
