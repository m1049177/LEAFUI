<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
                <h2 id="leafClient3App.technologyStack.home.createOrEditLabel">Create or edit a TechnologyStack</h2>
                <div>
                    <div class="form-group" v-if="technologyStack.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="technologyStack.id" readonly />
                    </div>
                    <b-row id="technologyName">
                        <b-col cols="7">
                        <div class="form-group">
                        <label class="form-control-label"  for="technology-stack-name">Name</label>
                        <input type="text" class="form-control" name="name" id="technology-stack-name"
                            :class="{'valid': !$v.technologyStack.name.$invalid, 'invalid': $v.technologyStack.name.$invalid }" 
                            v-model="$v.technologyStack.name.$model" />
                        <!-- <select class="form-control" id="technology-stack-name" name="name" :class="{'valid': !$v.technologyStack.name.$invalid, 'invalid': $v.technologyStack.name.$invalid }"
                         v-model="$v.technologyStack.name.$model">
                            <option v-for="technology in technologies" :key="technology.id">{{technology.name}}</option>
                        </select> -->
                         </div>
                          <div v-if="$v.technologyStack.name.$anyDirty && $v.technologyStack.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyStack.name.required">
                                This field is required.
                            </small>
                        </div>
                         
                        </b-col>
                        <b-col>
                             <div class="form-group">
                            <label class="form-control-label" for="technology-stack-version">Version</label>
                         <input type="text" placeholder="Please enter 0 if there is no version" class="form-control" name="name" id="technology-stack-version" 
                         :class="{'valid': !$v.version.$invalid, 'invalid': $v.version.$invalid }"
                            v-model="version" />
                        <p class="error" v-if="!version.numberValidation && version.touched">Please check your input.</p>
                            </div>
                            </b-col>
                           
                    </b-row>
                       <div v-if="!checkForExistences && !$v.technologyStack.name.$touched">
                                <b style="color:red;"> Already exists</b>
                            </div>
                
                    <div class="form-group">
                        <label class="form-control-label" for="technology-stack-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.technologyStack.type.$invalid, 'invalid': $v.technologyStack.type.$invalid }" 
                        v-model="$v.technologyStack.type.$model" id="technology-stack-type" >
                            <option  v-for="type in label.label_data" :key='type.id' v-bind:value='type.name' >{{type.name}}</option>
                        </select>
                    </div>
                      <div v-if="$v.technologyStack.type.$anyDirty && $v.technologyStack.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.technologyStack.type.required">
                                This field is required.
                            </small>
                        </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.technologyStack.$invalid ||  $v.version.$invalid || isSaving  "
                     class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./technology-stack-update.component.ts">
</script>
