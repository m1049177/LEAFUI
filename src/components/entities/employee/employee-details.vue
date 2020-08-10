<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class="jh-entity-heading"><span>Employee</span> {{employee.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Employee Id</span>
                    </dt>
                    <dd>
                        <span>{{employee.employeeId}}</span>
                    </dd>
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{employee.name}}</span>
                    </dd>
                    <dt>
                        <span>Date Of Joining</span>
                    </dt>
                    <dd>
                        <span>{{employee.dateOfJoining}}</span>
                    </dd>
                    <dt>
                        <span>Gender</span>
                    </dt>
                    <dd>
                        <span>{{employee.gender}}</span>
                    </dd>
                    <dt>
                        <span>Address</span>
                    </dt>
                    <dd>
                        <span>{{employee.address}}</span>
                    </dd>
                    <dt>
                        <span>Designation</span>
                    </dt>
                    <dd>
                        <span>{{employee.designation}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="employee.id" :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
