<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="technologyStack">
                <h2 class="jh-entity-heading"><span>TechnologyStack</span> {{technologyStack.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{technologyStack.name}}</span>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{technologyStack.type}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="technologyStack.id" :to="{name: 'TechnologyStackEdit', params: {technologyStackId: technologyStack.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./technology-stack-details.component.ts">
</script>
