<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="budget">
                <h2 class="jh-entity-heading"><span>Budget</span> {{budget.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Amount in ($)</span>
                    </dt>
                    <dd>
                        <span>{{budget.amount}}{{budget.successor}} </span>
                    </dd>
                    <dt>
                        <span>Year</span>
                    </dt>
                    <dd>
                        <span>{{budget.year}}</span>
                    </dd>
                    <!-- <dt>
                        <span>Successor</span>
                    </dt>
                    <dd>
                        <span>{{budget.successor}}</span>
                    </dd> -->
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="budget.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: budget.application.id}}">{{budget.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="budget.id" :to="{name: 'BudgetEdit', params: {budgetId: budget.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./budget-details.component.ts">
</script>
