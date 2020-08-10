<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="evaluation">
                <h2 class="jh-entity-heading"><span>Evaluation</span> {{evaluation.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Attempt Date</span>
                    </dt>
                    <dd>
                        <span>{{evaluation.attemptDate}}</span>
                    </dd>
                    <dt>
                        <span>Assesment Category</span>
                    </dt>
                    <dd>
                        <span>{{evaluation.assessmentCategory}}</span>
                    </dd>
                    <dt>
                        <span>Score</span>
                    </dt>
                    <dd>
                        <span>{{evaluation.score}}</span>
                    </dd>
                    <dt>
                        <span>Assesment Result</span>
                    </dt>
                    <dd>
                    <div v-for="n in count" :key="n" style="border:2px solid black">
                        <b-card>
                            <label style="color:black;font-weight:500;">Question - {{n}}</label>
                        <b-form-textarea
                            v-model="evaluation.assessmentResult.question[n-1]"
                            id="textarea-auto-height"
                            style="color:brown;"
                            v-bind:value="evaluation.assessmentResult.question[n-1]"
                            rows="2" max-rows="7" readonly=""></b-form-textarea>
                        <span style="color:green;"><b>Your Response :</b> {{evaluation.assessmentResult.result[n-1]}}</span>
                          <div v-if="evaluation.assessmentResult.description[n-1] !== null" style="color:green;">
                            <span> Your description : </span>
                            {{evaluation.assessmentResult.description[n-1]}}
                          </div>
                        </b-card>
                            </div>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="evaluation.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: evaluation.application.id}}">{{evaluation.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <!-- <router-link v-if="evaluation.id" :to="{name: 'EvaluationEdit', params: {evaluationId: evaluation.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./evaluation-details.component.ts">
</script>
