<template>
    <div>
        <h2 id="page-heading">
            <span id="line-of-business-heading">Line Of Businesses</span>
            <router-link :to="{name: 'LineOfBusinessCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-line-of-business">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new LineOfBusiness
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
        <div class="alert alert-warning" v-if="!isFetching && lineOfBusinesses && lineOfBusinesses.length === 0">
            <span>No lineOfBusinesses found</span>
        </div>
        <div class="table-responsive" v-if="lineOfBusinesses && lineOfBusinesses.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Oraganizational Unit</span></th>
                    <th><span>Employee</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lineOfBusiness in lineOfBusinesses"
                    :key="lineOfBusiness.id">
                    <td>
                        <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: lineOfBusiness.id}}">{{lineOfBusiness.id}}</router-link>
                    </td>
                    <td>{{lineOfBusiness.name}}</td>
                    <td>
                        <div v-if="lineOfBusiness.oraganizationalUnit">
                            <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: lineOfBusiness.oraganizationalUnit.id}}"> {{lineOfBusiness.oraganizationalUnit.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="lineOfBusiness.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: lineOfBusiness.employee.id}}">{{lineOfBusiness.employee.employeeId}}-{{lineOfBusiness.employee.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: lineOfBusiness.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'LineOfBusinessEdit', params: {lineOfBusinessId: lineOfBusiness.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(lineOfBusiness)"
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
            <span slot="modal-title"><span id="leafClient3App.lineOfBusiness.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-lineOfBusiness-heading" >Are you sure you want to delete this Line Of Business?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-lineOfBusiness" v-on:click="removeLineOfBusiness()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./line-of-business.component.ts">
</script>
