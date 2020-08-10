<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="businessFunction">
                <h2 class="jh-entity-heading"><span>BusinessFunction</span> {{businessFunction.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{businessFunction.type}}</span>
                    </dd>
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{businessFunction.name}}</span>
                    </dd>
                    <dt>
                        <span>Line Of Business</span>
                    </dt>
                    <dd>
                        <div v-if="businessFunction.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: businessFunction.lineOfBusiness.id}}">{{businessFunction.lineOfBusiness.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if="businessFunction.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: businessFunction.employee.id}}">{{businessFunction.employee.employeeId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="businessFunction.id" :to="{name: 'BusinessFunctionEdit', params: {businessFunctionId: businessFunction.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./business-function-details.component.ts">
</script>
