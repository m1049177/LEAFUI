<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="businessProcess">
                <h2 class="jh-entity-heading"><span>BusinessProcess</span> {{businessProcess.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{businessProcess.name}}</span>
                    </dd>
                    <dt>
                        <span>Start Date</span>
                    </dt>
                    <dd>
                        <span>{{businessProcess.startDate}}</span>
                    </dd>
                    <dt>
                        <span>Expected End Date</span>
                    </dt>
                    <dd>
                        <span>{{businessProcess.expectedEndDate}}</span>
                    </dd>
                    <dt>
                        <span>End Date</span>
                    </dt>
                    <dd>
                        <span>{{businessProcess.endDate}}</span>
                    </dd>
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{businessProcess.status}}</span>
                    </dd>
                    <dt>
                        <span>Capabilities</span>
                    </dt>
                    <dd>
                        <div v-if="businessProcess.capabilities">
                            <router-link :to="{name: 'CapabilitiesView', params: {capabilitiesId: businessProcess.capabilities.id}}">{{businessProcess.capabilities.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="businessProcess.id" :to="{name: 'BusinessProcessEdit', params: {businessProcessId: businessProcess.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./business-process-details.component.ts">
</script>
