<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="maintenance">
                <h2 class="jh-entity-heading"><span>Maintenance</span> {{maintenance.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Start Date</span>
                    </dt>
                    <dd>
                        <span>{{maintenance.startDate}}</span>
                    </dd>
                    <dt>
                        <span>End Date</span>
                    </dt>
                    <dd>
                        <span>{{maintenance.endDate}}</span>
                    </dd>
                    <dt>
                        <span>Application</span>
                    </dt>
                    <dd>
                        <div v-if="maintenance.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: maintenance.application.id}}">{{maintenance.application.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="maintenance.id" :to="{name: 'MaintenanceEdit', params: {maintenanceId: maintenance.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./maintenance-details.component.ts">
</script>
