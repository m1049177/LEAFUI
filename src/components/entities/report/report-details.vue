<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="report">
                <h2 class="jh-entity-heading"><span>Report</span> {{report.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{report.name}}</span>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{report.type}}</span>
                    </dd>
                    <dt>
                        <span>Reporting Tool</span>
                    </dt>
                    <dd>
                        <span>{{report.reportingTool}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="report.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: report.application.id}}">{{report.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="report.id" :to="{name: 'ReportEdit', params: {reportId: report.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./report-details.component.ts">
</script>
