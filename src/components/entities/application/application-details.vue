<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="application">
                <h2 class="jh-entity-heading"><span>Application</span> {{application.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{application.name}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{application.description}}</span>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{application.type}}</span>
                    </dd>
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{application.status}}</span>
                    </dd>
                    <dt>
                        <span>Implementation Date</span>
                    </dt>
                    <dd>
                        <span>{{application.implementationDate}}</span>
                    </dd>
                    <dt>
                        <span>Line Of Business</span>
                    </dt>
                    <dd>
                        <div v-if="application.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: application.lineOfBusiness.id}}">{{application.lineOfBusiness.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="application.id" :to="{name: 'ApplicationEdit', params: {applicationId: application.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./application-details.component.ts">
</script>
