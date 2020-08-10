<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.excelTemplate.home.createOrEditLabel">Create or edit a ExcelTemplate</h2>
                <div>
                    <div class="form-group" v-if="excelTemplate.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="excelTemplate.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="excel-template-fileName">File Name</label>
                        <div>
                            <div v-if="excelTemplate.fileName" class="form-text text-danger clearfix">
                                <a class="pull-left" v-on:click="openFile(excelTemplate.fileNameContentType, excelTemplate.fileName)">open</a><br>
                                <span class="pull-left">{{excelTemplate.fileNameContentType}}, {{byteSize(excelTemplate.fileName)}}</span>
                                <button type="button" v-on:click="excelTemplate.fileName=null;excelTemplate.fileNameContentType=null;"
                                        class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_fileName" id="file_fileName" v-on:change="setFileData($event, excelTemplate, 'fileName', false)"/>
                        </div>
                        <input type="hidden" class="form-control" name="fileName" id="excel-template-fileName"
                            :class="{'valid': !$v.excelTemplate.fileName.$invalid, 'invalid': $v.excelTemplate.fileName.$invalid }" v-model="$v.excelTemplate.fileName.$model"  required/>
                        <input type="hidden" class="form-control" name="fileNameContentType" id="excel-template-fileNameContentType"
                            v-model="excelTemplate.fileNameContentType" />
                        <div v-if="$v.excelTemplate.fileName.$anyDirty && $v.excelTemplate.fileName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.excelTemplate.fileName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="excel-template-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.excelTemplate.type.$invalid, 'invalid': $v.excelTemplate.type.$invalid }" v-model="$v.excelTemplate.type.$model" id="excel-template-type"  required>
                            <option value="APPPORTFOLIO" >APPPORTFOLIO</option>
                            <option value="TECHNICALVIEW" >TECHNICALVIEW</option>
                            <option value="BIZVIEW" >BIZVIEW</option>
                        </select>
                        <div v-if="$v.excelTemplate.type.$anyDirty && $v.excelTemplate.type.$invalid">
                            <small class="form-text text-danger" v-if="!$v.excelTemplate.type.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="excel-template-company">Company</label>
                        <select class="form-control" id="excel-template-company" name="company" v-model="excelTemplate.company">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="excelTemplate.company && companyOption.id === excelTemplate.company.id ? excelTemplate.company : companyOption" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.excelTemplate.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./excel-template-update.component.ts">
</script>
