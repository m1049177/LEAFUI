<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="spend">
                <h2 class="jh-entity-heading"><span>Spend</span> {{spend.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Date Of Update</span>
                    </dt>
                    <dd>
                        <span>{{spend.dateOfUpdate}}</span>
                    </dd>
                    <dt>
                        <span>Amount in ($)</span>
                    </dt>
                    <dd>
                        <span>{{spend.amount}}{{spend.successor}}</span>
                    </dd>
                    <dt>
                        <span>Spend Id</span>
                    </dt>
                    <dd>
                        <span>{{spend.spendId}}</span>
                    </dd>
                    <dt>
                        <span>Expenditure Type</span>
                    </dt>
                    <dd>
                        <span>{{spend.expenditureType}}</span>
                    </dd>
                    <dt>
                        <span>Expenditure Sub Type</span>
                    </dt>
                    <dd>
                        <span>{{spend.expenditureSubType}}</span>
                    </dd>
                    <!-- <dt>
                        <span>Successor</span>
                    </dt>
                    <dd>
                        <span>{{spend.successor}}</span>
                    </dd> -->
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="spend.id" :to="{name: 'SpendEdit', params: {spendId: spend.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./spend-details.component.ts">
</script>
