<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.company.home.createOrEditLabel">Create or edit a Company</h2>
                <div>
                    <div class="form-group" v-if="company.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="company.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="company-companyName">Company Name</label>
                        <input type="text" class="form-control" name="companyName" id="company-companyName"
                            :class="{'valid': !$v.company.companyName.$invalid, 'invalid': $v.company.companyName.$invalid }" v-model="$v.company.companyName.$model"  required/>
                        <div v-if="$v.company.companyName.$anyDirty && $v.company.companyName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.company.companyName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="company-description">Description</label>
                        <input type="text" class="form-control" name="description" id="company-description"
                            :class="{'valid': !$v.company.description.$invalid, 'invalid': $v.company.description.$invalid }" v-model="$v.company.description.$model"  required/>
                        <div v-if="$v.company.description.$anyDirty && $v.company.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.company.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="company-user">User</label>
                        <select class="form-control" id="company-user" name="user" v-model="company.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="company.user && userOption.id === company.user.id ? company.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.company.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./company-update.component.ts">
</script>
