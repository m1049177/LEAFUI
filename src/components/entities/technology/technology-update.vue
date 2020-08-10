<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.technology.home.createOrEditLabel">Create or edit a Technology</h2>
                <div>
                    <div class="form-group" v-if="technology.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="technology.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="technology-application">Application</label>
                        <select class="form-control" id="technology-application" name="application" v-model="technology.application">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="technology.application && applicationOption.id === technology.application.id ? technology.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="technology-technologyStack">Technology Stack</label>
                        <select class="form-control" id="technology-technologyStack" name="technologyStack" v-model="technology.technologyStack">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="technology.technologyStack && technologyStackOption.id === technology.technologyStack.id ? technology.technologyStack : technologyStackOption" v-for="technologyStackOption in technologyStacks" :key="technologyStackOption.id">{{technologyStackOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.technology.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./technology-update.component.ts">
</script>
