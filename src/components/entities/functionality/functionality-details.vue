<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="functionality">
                <h2 class="jh-entity-heading"><span>Functionality</span> {{functionality.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{functionality.name}}</span>
                    </dd>
                    <dt>
                        <span>Major Modules</span>
                    </dt>
                    <dd>
                        <span>{{functionality.majorModules}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="functionality.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: functionality.application.id}}">{{functionality.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="functionality.id" :to="{name: 'FunctionalityEdit', params: {functionalityId: functionality.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./functionality-details.component.ts">
</script>
