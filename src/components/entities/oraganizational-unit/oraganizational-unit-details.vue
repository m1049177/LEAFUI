<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="oraganizationalUnit">
                <h2 class="jh-entity-heading"><span>OraganizationalUnit</span> {{oraganizationalUnit.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{oraganizationalUnit.name}}</span>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if="oraganizationalUnit.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: oraganizationalUnit.employee.id}}">{{oraganizationalUnit.employee.employeeId}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Company</span>
                    </dt>
                    <dd>
                        <div v-if="oraganizationalUnit.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: oraganizationalUnit.company.id}}">{{oraganizationalUnit.company.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="oraganizationalUnit.id" :to="{name: 'OraganizationalUnitEdit', params: {oraganizationalUnitId: oraganizationalUnit.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./oraganizational-unit-details.component.ts">
</script>
