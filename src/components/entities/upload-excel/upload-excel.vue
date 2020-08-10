<template>
    <div>
        <h2 id="page-heading">
            <span id="upload-excel-heading">Upload Excels</span>
            <router-link :to="{name: 'UploadExcelCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-upload-excel">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new UploadExcel
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
        <div class="alert alert-warning" v-if="!isFetching && uploadExcels && uploadExcels.length === 0">
            <span>No uploadExcels found</span>
        </div>
        <div class="table-responsive" v-if="uploadExcels && uploadExcels.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Type</span></th>
                    <th><span>Company</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="uploadExcel in uploadExcels"
                    :key="uploadExcel.id">
                    <td>
                        <router-link :to="{name: 'UploadExcelView', params: {uploadExcelId: uploadExcel.id}}">{{uploadExcel.id}}</router-link>
                    </td>
                    <td>
                        <a v-if="uploadExcel.name" v-on:click="openFile(uploadExcel.nameContentType, uploadExcel.name)">open</a>
                        <span v-if="uploadExcel.name">{{uploadExcel.nameContentType}}, {{byteSize(uploadExcel.name)}}</span>
                    </td>
                    <td>{{uploadExcel.type}}</td>
                    <td>
                        <div v-if="uploadExcel.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: uploadExcel.company.id}}">{{uploadExcel.company.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'UploadExcelView', params: {uploadExcelId: uploadExcel.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'UploadExcelEdit', params: {uploadExcelId: uploadExcel.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(uploadExcel)"
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
            <span slot="modal-title"><span id="leafClient3App.uploadExcel.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-uploadExcel-heading" >Are you sure you want to delete this Upload Excel?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-uploadExcel" v-on:click="removeUploadExcel()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./upload-excel.component.ts">
</script>
