<template>
    <div>
        <h2 id="page-heading">
            <span id="oraganizational-unit-heading">Oraganizational Units</span>
            <router-link :to="{name: 'OraganizationalUnitCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-oraganizational-unit">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new OraganizationalUnit 
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
        <div class="alert alert-warning" v-if="!isFetching && oraganizationalUnits && oraganizationalUnits.length === 0">
            <span>No oraganizationalUnits found</span>
        </div>
        <div class="table-responsive" v-if="oraganizationalUnits && oraganizationalUnits.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Employee</span></th>
                    <th><span>Company</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="oraganizationalUnit in oraganizationalUnits"
                    :key="oraganizationalUnit.id">
                    <td>
                        <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: oraganizationalUnit.id}}">{{oraganizationalUnit.id}}</router-link>
                    </td>
                    <td>{{oraganizationalUnit.name}}</td>
                    <td>
                        <div v-if="oraganizationalUnit.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: oraganizationalUnit.employee.id}}">{{oraganizationalUnit.employee.employeeId}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="oraganizationalUnit.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: oraganizationalUnit.company.id}}">{{oraganizationalUnit.company.companyName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: oraganizationalUnit.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'OraganizationalUnitEdit', params: {oraganizationalUnitId: oraganizationalUnit.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(oraganizationalUnit)"
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
            <span slot="modal-title"><span id="leafClient3App.oraganizationalUnit.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-oraganizationalUnit-heading" >Are you sure you want to delete this Oraganizational Unit?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-oraganizationalUnit" v-on:click="removeOraganizationalUnit()">Delete</button>
            </div>

        </b-modal>
    </div>
</template>

<script lang="ts" src="./oraganizational-unit.component.ts">
</script>
