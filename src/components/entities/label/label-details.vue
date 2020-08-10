<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="label">
                <h2 class="jh-entity-heading"><span>Label</span> {{label.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Label Type</span>
                    </dt>
                    <dd>
                        <span>{{label.label_type}}</span>
                    </dd>
                    <dt>
                        <span>Label Data</span>
                    </dt>
                    <dd>
                        <span>{{label.label_data}}</span>
                    </dd>
                    <dt>
                        <span>Company</span>
                    </dt>
                    <dd>
                        <div v-if="label.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: label.company.id}}">{{label.company.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="label.id" :to="{name: 'LabelEdit', params: {labelId: label.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./label-details.component.ts">
</script>
