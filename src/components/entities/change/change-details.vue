<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="change">
                <h2 class="jh-entity-heading"><span>Change</span> {{change.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{change.description}}</span>
                    </dd>
                    <dt>
                        <span>Date Of Change</span>
                    </dt>
                    <dd>
                        <span>{{change.dateOfChange}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="change.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: change.application.id}}">{{change.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="change.id" :to="{name: 'ChangeEdit', params: {changeId: change.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./change-details.component.ts">
</script>
