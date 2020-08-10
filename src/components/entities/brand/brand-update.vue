<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.brand.home.createOrEditLabel">Create or edit a Brand</h2>
                <div>
                    <div class="form-group" v-if="brand.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="brand.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="brand-name">Name</label>
                        <input type="text" class="form-control" name="name" id="brand-name"
                            :class="{'valid': !$v.brand.name.$invalid, 'invalid': $v.brand.name.$invalid }" v-model="$v.brand.name.$model"  required/>
                        <div v-if="$v.brand.name.$anyDirty && $v.brand.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.brand.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="brand-lineOfBusiness">Line Of Business</label>
                        <select class="form-control" id="brand-lineOfBusiness" name="lineOfBusiness" v-model="brand.lineOfBusiness">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="brand.lineOfBusiness && lineOfBusinessOption.id === brand.lineOfBusiness.id ? brand.lineOfBusiness : lineOfBusinessOption" v-for="lineOfBusinessOption in lineOfBusinesses" :key="lineOfBusinessOption.id">{{lineOfBusinessOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.brand.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./brand-update.component.ts">
</script>
