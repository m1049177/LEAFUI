<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="technologyRecommendation">
                <h2 class="jh-entity-heading"><span>TechnologyRecommendation</span> {{technologyRecommendation.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Technology Name</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.technologyName}}</span>
                    </dd>
                    <dt>
                        <span>Outdated Version</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.outdatedVersion}}</span>
                    </dd>
                    <dt>
                        <span>Stable Version</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.stableVersion}}</span>
                    </dd>
                    <dt>
                        <span>Latest Version</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.latestVersion}}</span>
                    </dd>
                    <dt>
                        <span>New Features</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.newFeatures}}</span>
                    </dd>
                    <dt>
                        <span>Technology Type</span>
                    </dt>
                    <dd>
                        <span>{{technologyRecommendation.technologyType}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="technologyRecommendation.id" :to="{name: 'TechnologyRecommendationEdit', params: {technologyRecommendationId: technologyRecommendation.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./technology-recommendation-details.component.ts">
</script>
