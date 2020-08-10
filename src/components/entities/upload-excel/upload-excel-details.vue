<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="uploadExcel">
                <h2 class="jh-entity-heading"><span>UploadExcel</span> {{uploadExcel.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <div v-if="uploadExcel.name">
                            <a v-on:click="openFile(uploadExcel.nameContentType, uploadExcel.name)">open</a>
                            {{uploadExcel.nameContentType}}, {{byteSize(uploadExcel.name)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{uploadExcel.type}}</span>
                    </dd>
                    <dt>
                        <span>Company</span>
                    </dt>
                    <dd>
                        <div v-if="uploadExcel.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: uploadExcel.company.id}}">{{uploadExcel.company.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="uploadExcel.id" :to="{name: 'UploadExcelEdit', params: {uploadExcelId: uploadExcel.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./upload-excel-details.component.ts">
</script>
