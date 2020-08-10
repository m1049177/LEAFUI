<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="technology">
                <h2 class="jh-entity-heading"><span>Technology</span> {{technology.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="technology.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: technology.application.id}}">{{technology.application.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Technology Stack</span>
                    </dt>
                    <dd>
                        <div v-if="technology.technologyStack">
                            <router-link :to="{name: 'TechnologyStackView', params: {technologyStackId: technology.technologyStack.id}}">{{technology.technologyStack.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="technology.id" :to="{name: 'TechnologyEdit', params: {technologyId: technology.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./technology-details.component.ts">
</script>
