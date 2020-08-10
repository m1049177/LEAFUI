<template>
    <div>
        <h2 id="page-heading">
            <span id="business-function-heading">Business Functions</span>
            <router-link :to="{name: 'BusinessFunctionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-business-function">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new BusinessFunction
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
        <div class="alert alert-warning" v-if="!isFetching && businessFunctions && businessFunctions.length === 0">
            <span>No businessFunctions found</span>
        </div>
        <div class="table-responsive" v-if="businessFunctions && businessFunctions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Type</span></th>
                    <th><span>Name</span></th>
                    <th><span>Line Of Business</span></th>
                    <th><span>Employee</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="businessFunction in businessFunctions"
                    :key="businessFunction.id">
                    <td>
                        <router-link :to="{name: 'BusinessFunctionView', params: {businessFunctionId: businessFunction.id}}">{{businessFunction.id}}</router-link>
                    </td>
                    <td>{{businessFunction.type}}</td>
                    <td>{{businessFunction.name}}</td>
                    <td>
                        <div v-if="businessFunction.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: businessFunction.lineOfBusiness.id}}">{{businessFunction.lineOfBusiness.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="businessFunction.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: businessFunction.employee.id}}">{{businessFunction.employee.employeeId}}- {{businessFunction.employee.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'BusinessFunctionView', params: {businessFunctionId: businessFunction.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'BusinessFunctionEdit', params: {businessFunctionId: businessFunction.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(businessFunction)"
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
            <span slot="modal-title"><span id="leafClient3App.businessFunction.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-businessFunction-heading" >Are you sure you want to delete this Business Function?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-businessFunction" v-on:click="removeBusinessFunction()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./business-function.component.ts">
</script>
