<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.capabilities.home.createOrEditLabel">Create or edit a Capabilities</h2>
                <div>
                    <div class="form-group" v-if="capabilities.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="capabilities.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="capabilities-description">Description</label>
                        <input type="text" class="form-control" name="description" id="capabilities-description"
                            :class="{'valid': !$v.capabilities.description.$invalid, 'invalid': $v.capabilities.description.$invalid }" v-model="$v.capabilities.description.$model"  required/>
                        <div v-if="$v.capabilities.description.$anyDirty && $v.capabilities.description.$invalid">
                            <small class="form-text text-danger" v-if="!$v.capabilities.description.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="capabilities-businessFunction">Business Function</label>
                        <select class="form-control" id="capabilities-businessFunction" name="businessFunction" v-model="capabilities.businessFunction">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="capabilities.businessFunction && businessFunctionOption.id === capabilities.businessFunction.id ? capabilities.businessFunction : businessFunctionOption" v-for="businessFunctionOption in businessFunctions" :key="businessFunctionOption.id">{{businessFunctionOption.id}} - {{businessFunctionOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.capabilities.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./capabilities-update.component.ts">
</script>
