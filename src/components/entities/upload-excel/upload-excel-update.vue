<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" enctype="multipart/form-data">
                <h2 id="leafClient3App.uploadExcel.home.createOrEditLabel">Create or edit a UploadExcel</h2>
                <div>
                    <div class="form-group" v-if="uploadExcel.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="uploadExcel.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="upload-excel-name">Name</label>
                        <div>
                            <div v-if="uploadExcel.name" class="form-text text-danger clearfix">
                                <a class="pull-left" v-on:click="openFile(uploadExcel.nameContentType, uploadExcel.name)">open</a><br>
                                <span class="pull-left">{{uploadExcel.nameContentType}}, {{byteSize(uploadExcel.name)}}</span>
                                <button type="button" v-on:click="uploadExcel.name=null;uploadExcel.nameContentType=null;"
                                        class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_name" id="file_name" v-on:change="setFileData($event, uploadExcel, 'name', false)"/>
                        </div>
                        <input type="hidden" class="form-control" name="name" id="upload-excel-name"
                            :class="{'valid': !$v.uploadExcel.name.$invalid, 'invalid': $v.uploadExcel.name.$invalid }" v-model="$v.uploadExcel.name.$model"  required/>
                        <input type="hidden" class="form-control" name="nameContentType" id="upload-excel-nameContentType"
                            v-model="uploadExcel.nameContentType" />
                        <div v-if="$v.uploadExcel.name.$anyDirty && $v.uploadExcel.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.uploadExcel.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="upload-excel-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.uploadExcel.type.$invalid, 'invalid': $v.uploadExcel.type.$invalid }" v-model="$v.uploadExcel.type.$model" id="upload-excel-type"  required>
                            <option value="APPPORTFOLIO" >APPPORTFOLIO</option>
                            <option value="TECHNICALVIEW" >TECHNICALVIEW</option>
                            <option value="BIZVIEW" >BIZVIEW</option>
                        </select>
                        <div v-if="$v.uploadExcel.type.$anyDirty && $v.uploadExcel.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.uploadExcel.type.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="upload-excel-company">Company</label>
                        <select class="form-control" id="upload-excel-company" name="company" v-model="uploadExcel.company" required>
                            <option v-if="!uploadExcel.company" v-bind:value="null" selected></option>
                            <option v-bind:value="uploadExcel.company && companyOption.id === uploadExcel.company.id ? uploadExcel.company : companyOption" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select>
                    </div>
                    <div v-if="$v.uploadExcel.company.$anyDirty && $v.uploadExcel.company.$invalid">
                        <small class="form-text text-danger" v-if="!$v.uploadExcel.company.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.uploadExcel.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./upload-excel-update.component.ts">
</script>
