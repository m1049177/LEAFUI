<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.example.home.createOrEditLabel">Create or edit a Example</h2>
                <div>
                    <div class="form-group" v-if="example.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="example.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="example-name">Name</label>
                        <input type="text" class="form-control" name="name" id="example-name"
                            :class="{'valid': !$v.example.name.$invalid, 'invalid': $v.example.name.$invalid }" v-model="$v.example.name.$model"  required/>
                        <div v-if="$v.example.name.$anyDirty && $v.example.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.example.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.example.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./example-update.component.ts">
</script>
