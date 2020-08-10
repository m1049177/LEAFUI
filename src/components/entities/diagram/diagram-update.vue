<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.diagram.home.createOrEditLabel">Create or edit a Diagram</h2>
                <div>
                    <div class="form-group" v-if="diagram.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="diagram.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="diagram-category">Category</label>
                        <select class="form-control" name="category" :class="{'valid': !$v.diagram.category.$invalid, 'invalid': $v.diagram.category.$invalid }" v-model="$v.diagram.category.$model" id="diagram-category"  required>
                            <option value="APPPORTFOLIO" >APPPORTFOLIO</option>
                            <option value="TECHNICALVIEW" >TECHNICALVIEW</option>
                            <option value="FUNCTIONALVIEW" >FUNCTIONALVIEW</option>
                        </select>
                        <div v-if="$v.diagram.category.$anyDirty && $v.diagram.category.$invalid">
                            <small class="form-text text-danger" v-if="!$v.diagram.category.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="diagram-picture">Picture</label>
                        <div>
                            <img v-bind:src="'data:' + diagram.pictureContentType + ';base64,' + diagram.picture" style="max-height: 100px;" v-if="diagram.picture" alt="diagram image"/>
                            <div v-if="diagram.picture" class="form-text text-danger clearfix">
                                <span class="pull-left">{{diagram.pictureContentType}}, {{byteSize(diagram.picture)}}</span>
                                <button type="button" v-on:click="clearInputImage('picture', 'pictureContentType', 'file_picture')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_picture" id="file_picture" v-on:change="setFileData($event, diagram, 'picture', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="picture" id="diagram-picture"
                            :class="{'valid': !$v.diagram.picture.$invalid, 'invalid': $v.diagram.picture.$invalid }" v-model="$v.diagram.picture.$model"  required/>
                        <input type="hidden" class="form-control" name="pictureContentType" id="diagram-pictureContentType"
                            v-model="diagram.pictureContentType" />
                        <div v-if="$v.diagram.picture.$anyDirty && $v.diagram.picture.$invalid">
                            <small class="form-text text-danger" v-if="!$v.diagram.picture.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="diagram-company">Company</label>
                        <select class="form-control" id="diagram-company" name="company" v-model="diagram.company" required>
                            <option v-if="!diagram.company" v-bind:value="null" selected></option>
                            <option v-bind:value="diagram.company && companyOption.id === diagram.company.id ? diagram.company : companyOption" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select>
                    </div>
                    <div v-if="$v.diagram.company.$anyDirty && $v.diagram.company.$invalid">
                        <small class="form-text text-danger" v-if="!$v.diagram.company.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.diagram.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./diagram-update.component.ts">
</script>
