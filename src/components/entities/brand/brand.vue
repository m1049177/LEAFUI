<template>
    <div>
        <h2 id="page-heading">
            <span id="brand-heading">Brands</span>
            <router-link :to="{name: 'BrandCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-brand">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Brand
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
        <div class="alert alert-warning" v-if="!isFetching && brands && brands.length === 0">
            <span>No brands found</span>
        </div>
        <div class="table-responsive" v-if="brands && brands.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Line Of Business</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="brand in brands"
                    :key="brand.id">
                    <td>
                        <router-link :to="{name: 'BrandView', params: {brandId: brand.id}}">{{brand.id}}</router-link>
                    </td>
                    <td>{{brand.name}}</td>
                    <td>
                        <div v-if="brand.lineOfBusiness">
                            <router-link :to="{name: 'LineOfBusinessView', params: {lineOfBusinessId: brand.lineOfBusiness.id}}">{{brand.lineOfBusiness.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'BrandView', params: {brandId: brand.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'BrandEdit', params: {brandId: brand.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(brand)"
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
            <span slot="modal-title"><span id="leafClient3App.brand.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-brand-heading" >Are you sure you want to delete this Brand?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-brand" v-on:click="removeBrand()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./brand.component.ts">
</script>
