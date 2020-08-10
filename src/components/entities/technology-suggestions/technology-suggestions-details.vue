<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="technologySuggestions">
                <h2 class="jh-entity-heading"><span>TechnologySuggestions</span> {{technologySuggestions.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{technologySuggestions.type}}</span>
                    </dd>
                    <dt>
                        <span>Version</span>
                    </dt>
                    <dd>
                        <span>{{technologySuggestions.version}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{technologySuggestions.description}}</span>
                    </dd>
                    <dt>
                        <span>Suggestion</span>
                    </dt>
                    <dd>
                        <span>{{technologySuggestions.suggestion}}</span>
                    </dd>
                    <dt>
                        <span>Technology Recommendation</span>
                    </dt>
                    <dd>
                        <div v-if="technologySuggestions.technologyRecommendation">
                            <router-link :to="{name: 'TechnologyRecommendationView', params: {technologyRecommendationId: technologySuggestions.technologyRecommendation.id}}">{{technologySuggestions.technologyRecommendation.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="technologySuggestions.id" :to="{name: 'TechnologySuggestionsEdit', params: {technologySuggestionsId: technologySuggestions.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./technology-suggestions-details.component.ts">
</script>
