<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="issue">
                <h2 class="jh-entity-heading"><span>Issue</span> {{issue.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{issue.description}}</span>
                    </dd>
                    <dt>
                        <span>Date Of Issue</span>
                    </dt>
                    <dd>
                        <span>{{issue.dateOfIssue}}</span>
                    </dd>
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{issue.status}}</span>
                    </dd>
                    <dt>
                        <span>Solved Date</span>
                    </dt>
                    <dd>
                        <span>{{issue.solvedDate}}</span>
                    </dd>
                    <dt>
                        <span>Solved By</span>
                    </dt>
                    <dd>
                        <span>{{issue.solvedBy}}</span>
                    </dd>
                    <dt>
                        <span>Number Of Days</span>
                    </dt>
                    <dd>
                        <span>{{issue.numberOfDays}}</span>
                    </dd>
                    <dt>
                        <span>Type Of Issue</span>
                    </dt>
                    <dd>
                        <span>{{issue.typeOfIssue}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="issue.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: issue.application.id}}">{{issue.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="issue.id" :to="{name: 'IssueEdit', params: {issueId: issue.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./issue-details.component.ts">
</script>
