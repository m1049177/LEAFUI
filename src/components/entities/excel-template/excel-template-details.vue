<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="excelTemplate">
                <h2 class="jh-entity-heading"><span>ExcelTemplate</span> {{excelTemplate.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>File Name</span>
                    </dt>
                    <dd>
                        <div v-if="excelTemplate.fileName">
                            <a v-on:click="openFile(excelTemplate.fileNameContentType, excelTemplate.fileName)">open</a>
                            {{excelTemplate.fileNameContentType}}, {{byteSize(excelTemplate.fileName)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{excelTemplate.type}}</span>
                    </dd>
                    <dt>
                        <span>Company</span>
                    </dt>
                    <dd>
                        <div v-if="excelTemplate.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: excelTemplate.company.id}}">{{excelTemplate.company.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="excelTemplate.id" :to="{name: 'ExcelTemplateEdit', params: {excelTemplateId: excelTemplate.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./excel-template-details.component.ts">
</script>
