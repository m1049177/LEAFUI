<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="capabilities">
                <h2 class="jh-entity-heading"><span>Capabilities</span> {{capabilities.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{capabilities.description}}</span>
                    </dd>
                    <dt>
                        <span>Business Function</span>
                    </dt>
                    <dd>
                        <div v-if="capabilities.businessFunction">
                            <router-link :to="{name: 'BusinessFunctionView', params: {businessFunctionId: capabilities.businessFunction.id}}">{{capabilities.businessFunction.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="capabilities.id" :to="{name: 'CapabilitiesEdit', params: {capabilitiesId: capabilities.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./capabilities-details.component.ts">
</script>
