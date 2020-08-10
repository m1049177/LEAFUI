<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="expenditure">
                <h2 class="jh-entity-heading"><span>Expenditure</span> {{expenditure.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Expenditure Type</span>
                    </dt>
                    <dd>
                        <span>{{expenditure.expenditureType}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{expenditure.description}}</span>
                    </dd>
                    <dt>
                        <span>Start Date</span>
                    </dt>
                    <dd>
                        <span>{{expenditure.startDate}}</span>
                    </dd>
                    <dt>
                        <span>End Date</span>
                    </dt>
                    <dd>
                        <span>{{expenditure.endDate}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="expenditure.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: expenditure.application.id}}">{{expenditure.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="expenditure.id" :to="{name: 'ExpenditureEdit', params: {expenditureId: expenditure.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./expenditure-details.component.ts">
</script>
