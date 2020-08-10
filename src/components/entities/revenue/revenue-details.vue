<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="revenue">
                <h2 class="jh-entity-heading"><span>Revenue</span> {{revenue.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Date</span>
                    </dt>
                    <dd>
                        <span>{{revenue.date}}</span>
                    </dd>
                    <dt>
                        <span>Amount in ($)</span>
                    </dt>
                    <dd>
                        <span>{{revenue.amount}}{{revenue.successor}}</span>
                    </dd>
                    <!-- <dt>
                        <span>Successor</span>
                    </dt>
                    <dd>
                        <span>{{revenue.successor}}</span>
                    </dd> -->
                    <dt>
                        <span>Line Of Business</span>
                    </dt>
                    <dd>
                        <div v-if="revenue.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: revenue.lineOfBusiness.id}}">{{revenue.lineOfBusiness.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="revenue.id" :to="{name: 'RevenueEdit', params: {revenueId: revenue.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./revenue-details.component.ts">
</script>
