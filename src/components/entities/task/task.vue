<template>
    <div>
        <h2 id="page-heading">
            <span id="task-heading">Tasks</span>
            <router-link :to="{name: 'TaskCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-task">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Task
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && tasks && tasks.length === 0">
            <span>No tasks found</span>
        </div>
        <div class="table-responsive" v-if="tasks && tasks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Estimated Cost</span></th>
                    <th><span>Successor</span></th>
                    <th><span>Activity</span></th>
                    <th><span>Employee</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="task in tasks"
                    :key="task.id">
                    <td>
                        <router-link :to="{name: 'TaskView', params: {taskId: task.id}}">{{task.id}}</router-link>
                    </td>
                    <td>{{task.name}}</td>
                    <td>{{task.estimatedCost}}</td>
                    <td>{{task.successor}}</td>
                    <td>
                        <div v-if="task.activity">
                            <router-link :to="{name: 'ActivityView', params: {activityId: task.activity.id}}">{{task.activity.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="task.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: task.employee.employeeId}}">{{task.employee.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'TaskView', params: {taskId: task.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'TaskEdit', params: {taskId: task.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(task)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="leafClient3App.task.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-task-heading" >Are you sure you want to delete this Task?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-task" v-on:click="removeTask()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./task.component.ts">
</script>
