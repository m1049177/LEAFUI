<template>
    <div>
        <h2 id="page-heading">
            <span id="company-heading">Companies</span>
            <router-link :to="{name: 'CompanyCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-company">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Company
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
        <div class="alert alert-warning" v-if="!isFetching && companies && companies.length === 0">
            <span>No companies found</span>
        </div>
        <div class="table-responsive" v-if="companies && companies.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Company Name</span></th>
                    <th><span>Description</span></th>
                    <th><span>User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="company in companies"
                    :key="company.id">
                    <td>
                        <router-link :to="{name: 'CompanyView', params: {companyId: company.id}}">{{company.id}}</router-link>
                    </td>
                    <td>{{company.companyName}}</td>
                    <td>{{company.description}}</td>
                    <td>
                        {{company.user ? company.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'CompanyView', params: {companyId: company.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'CompanyEdit', params: {companyId: company.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(company)"
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
            <span slot="modal-title"><span id="leafClient3App.company.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-company-heading" >Are you sure you want to delete this Company?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-company" v-on:click="removeCompany()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./company.component.ts">
</script>
