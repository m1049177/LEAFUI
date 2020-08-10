<template>
    <div>
        <h2 id="page-heading">
            <span id="budget-heading">Budgets</span>
            <router-link :to="{name: 'BudgetCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-budget">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Budget
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
        <div class="alert alert-warning" v-if="!isFetching && budgets && budgets.length === 0">
            <span>No budgets found</span>
        </div>
        <div class="table-responsive" v-if="budgets && budgets.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('amount')"><span>Amount in ($)</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('year')"><span>Year</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <!-- <th v-on:click="changeOrder('successor')"><span>Successor</span> <font-awesome-icon icon="sort"></font-awesome-icon></th> -->
                    <th v-on:click="changeOrder('application.id')"><span>Application</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="budget in budgets"
                    :key="budget.id">
                    <td>
                        <router-link :to="{name: 'BudgetView', params: {budgetId: budget.id}}">{{budget.id}}</router-link>
                    </td>
                    <td>{{budget.amount}}{{budget.successor}}</td>
                    <td>{{budget.year}}</td>
                    <!-- <td>{{budget.successor}}</td> -->
                    <td>
                        <div v-if="budget.application">
                            <router-link :to="{name: 'ApplicationView', params: {applicationId: budget.application.id}}">{{budget.application.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'BudgetView', params: {budgetId: budget.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'BudgetEdit', params: {budgetId: budget.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(budget)"
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
            <span slot="modal-title"><span id="leafClient3App.budget.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-budget-heading" >Are you sure you want to delete this Budget?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-budget" v-on:click="removeBudget()">Delete</button>
            </div>
        </b-modal>
        <div v-if="budgets && budgets.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./budget.component.ts">
</script>
