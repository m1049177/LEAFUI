<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="company">
                <h2 class="jh-entity-heading"><span>Company</span> {{company.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Company Name</span>
                    </dt>
                    <dd>
                        <span>{{company.companyName}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{company.description}}</span>
                    </dd>
                    <dt>
                        <span>User</span>
                    </dt>
                    <dd>
                        {{company.user ? company.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="company.id" :to="{name: 'CompanyEdit', params: {companyId: company.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./company-details.component.ts">
</script>
