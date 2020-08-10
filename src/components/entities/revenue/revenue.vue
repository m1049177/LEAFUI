<template>
    <div>
        <h2 id="page-heading">
            <span id="revenue-heading">Revenues</span>
            <router-link :to="{name: 'RevenueCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-revenue">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Revenue
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
        <div class="alert alert-warning" v-if="!isFetching && revenues && revenues.length === 0">
            <span>No revenues found</span>
        </div>
        <div class="table-responsive" v-if="revenues && revenues.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Date</span></th>
                    <th><span>Amount in ($)</span></th>
                    <!-- <th><span>Successor</span></th> -->
                    <th><span>Line Of Business</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="revenue in revenues"
                    :key="revenue.id">
                    <td>
                        <router-link :to="{name: 'RevenueView', params: {revenueId: revenue.id}}">{{revenue.id}}</router-link>
                    </td>
                    <td>{{revenue.date}}</td>
                    <td>{{revenue.amount}}{{revenue.successor}}</td>
                    <!-- <td>{{revenue.successor}}</td> -->
                    <td>
                        <div v-if="revenue.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: revenue.lineOfBusiness.id}}">{{revenue.lineOfBusiness.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'RevenueView', params: {revenueId: revenue.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'RevenueEdit', params: {revenueId: revenue.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(revenue)"
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
            <span slot="modal-title"><span id="leafClient3App.revenue.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-revenue-heading" >Are you sure you want to delete this Revenue?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-revenue" v-on:click="removeRevenue()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./revenue.component.ts">
</script>
