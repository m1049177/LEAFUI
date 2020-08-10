<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="integration">
                <h2 class="jh-entity-heading"><span>Integration</span> {{integration.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Flow Type</span>
                    </dt>
                    <dd>
                        <span>{{integration.flowType}}</span>
                    </dd>
                    <dt>
                        <span>Entity</span>
                    </dt>
                    <dd>
                        <span>{{integration.entity}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="integration.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: integration.application.id}}">{{integration.application.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Integration App Id</span>
                    </dt>
                    <dd>
                        <div v-if="integration.integrationApp">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: integration.integrationApp.id}}">{{integration.integrationApp.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="integration.id" :to="{name: 'IntegrationEdit', params: {integrationId: integration.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./integration-details.component.ts">
</script>
