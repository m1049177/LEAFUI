<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="assessment">
                <h2 class="jh-entity-heading"><span>Assessment</span> {{assessment.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Assessment Category</span>
                    </dt>
                    <dd>
                        <span>{{assessment.assessmentCategory}}</span>
                    </dd>
                    <dt>
                        <span>Questions</span>
                    </dt>
                    <dd>
                           <b-form-textarea
                                id="textarea-auto-height"
                                v-for="item in question" :key="item.id"
                                v-bind:value="item"
                                rows="2" max-rows="7" readonly></b-form-textarea>
                        <!-- <span>{{assessment.questions}}</span> -->
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="assessment.id" :to="{name: 'AssessmentEdit', params: {assessmentId: assessment.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./assessment-details.component.ts">
</script>
