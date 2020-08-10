<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.label.home.createOrEditLabel">Create or edit a Label</h2>
                <div>
                    <div class="form-group" v-if="label.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="label.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="label-label_type">Label Type</label>
                        <input type="text" class="form-control" name="label_type" id="label-label_type"
                            :class="{'valid': !$v.label.label_type.$invalid, 'invalid': $v.label.label_type.$invalid }" v-model="$v.label.label_type.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="label-label_data">Label Data</label>
                        <textarea class="form-control" name="label_data" id="label-label_data"
                            :class="{'valid': !$v.label.label_data.$invalid, 'invalid': $v.label.label_data.$invalid }" v-model="$v.label.label_data.$model"  required></textarea>
                        <div v-if="$v.label.label_data.$anyDirty && $v.label.label_data.$invalid">
                            <small class="form-text text-danger" v-if="!$v.label.label_data.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="label-company">Company</label>
                        <select class="form-control" id="label-company" name="company" v-model="label.company" required>
                            <option v-if="!label.company" v-bind:value="null" selected></option>
                            <option v-bind:value="label.company && companyOption.id === label.company.id ? label.company : companyOption" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select>
                    </div>
                    <div v-if="$v.label.company.$anyDirty && $v.label.company.$invalid">
                        <small class="form-text text-danger" v-if="!$v.label.company.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.label.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./label-update.component.ts">
</script>
