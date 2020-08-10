<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="lineOfBusiness">
                <h2 class="jh-entity-heading"><span>LineOfBusiness</span> {{lineOfBusiness.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{lineOfBusiness.name}}</span>
                    </dd>
                    <dt>
                        <span>Oraganizational Unit</span>
                    </dt>
                    <dd>
                        <div v-if="lineOfBusiness.oraganizationalUnit">
                            <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: lineOfBusiness.oraganizationalUnit.id}}">{{lineOfBusiness.oraganizationalUnit.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if="lineOfBusiness.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: lineOfBusiness.employee.id}}">{{lineOfBusiness.employee.employeeId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="lineOfBusiness.id" :to="{name: 'LineOfBusinessEdit', params: {lineOfBusinessId: lineOfBusiness.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./line-of-business-details.component.ts">
</script>
