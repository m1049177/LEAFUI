<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="task">
                <h2 class="jh-entity-heading"><span>Task</span> {{task.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{task.name}}</span>
                    </dd>
                    <dt>
                        <span>Estimated Cost</span>
                    </dt>
                    <dd>
                        <span>{{task.estimatedCost}}</span>
                    </dd>
                    <dt>
                        <span>Successor</span>
                    </dt>
                    <dd>
                        <span>{{task.successor}}</span>
                    </dd>
                    <dt>
                        <span>Activity</span>
                    </dt>
                    <dd>
                        <div v-if="task.activity">
                            <router-link :to="{name: 'ActivityView', params: {activityId: task.activity.id}}">{{task.activity.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Employee</span>
                    </dt>
                    <dd>
                        <div v-if="task.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: task.employee.id}}">{{task.employee.employeeId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="task.id" :to="{name: 'TaskEdit', params: {taskId: task.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./task-details.component.ts">
</script>
