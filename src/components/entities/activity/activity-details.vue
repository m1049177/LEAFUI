<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="activity">
                <h2 class="jh-entity-heading"><span>Activity</span> {{activity.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{activity.name}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{activity.description}}</span>
                    </dd>
                    <dt>
                        <span>Resources Required</span>
                    </dt>
                    <dd>
                        <span>{{activity.resourcesRequired}}</span>
                    </dd>
                    <dt>
                        <span>Business Process</span>
                    </dt>
                    <dd>
                        <div v-if="activity.businessProcess">
                            <router-link :to="{name: 'BusinessProcessView', params: {businessProcessId: activity.businessProcess.id}}">{{activity.businessProcess.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="activity.id" :to="{name: 'ActivityEdit', params: {activityId: activity.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./activity-details.component.ts">
</script>
