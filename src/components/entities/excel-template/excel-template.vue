<template>
    <div>
        <h2 id="page-heading">
            <span id="excel-template-heading">Excel Templates</span>
            <router-link :to="{name: 'ExcelTemplateCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-excel-template">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new ExcelTemplate
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && excelTemplates && excelTemplates.length === 0">
            <span>No excelTemplates found</span>
        </div>
        <div class="table-responsive" v-if="excelTemplates && excelTemplates.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>File Name</span></th>
                    <th><span>Type</span></th>
                    <th><span>Company</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="excelTemplate in excelTemplates"
                    :key="excelTemplate.id">
                    <td>
                        <router-link :to="{name: 'ExcelTemplateView', params: {excelTemplateId: excelTemplate.id}}">{{excelTemplate.id}}</router-link>
                    </td>
                    <td>
                        <a v-if="excelTemplate.fileName" v-on:click="openFile(excelTemplate.fileNameContentType, excelTemplate.fileName)">open</a>
                        <span v-if="excelTemplate.fileName">{{excelTemplate.fileNameContentType}}, {{byteSize(excelTemplate.fileName)}}</span>
                    </td>
                    <td>{{excelTemplate.type}}</td>
                    <td>
                        <div v-if="excelTemplate.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: excelTemplate.company.id}}">{{excelTemplate.company.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ExcelTemplateView', params: {excelTemplateId: excelTemplate.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ExcelTemplateEdit', params: {excelTemplateId: excelTemplate.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(excelTemplate)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="leafClient3App.excelTemplate.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-excelTemplate-heading" >Are you sure you want to delete this Excel Template?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-excelTemplate" v-on:click="removeExcelTemplate()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./excel-template.component.ts">
</script>
