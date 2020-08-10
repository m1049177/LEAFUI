<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.revenue.home.createOrEditLabel">Create or edit a Revenue</h2>
                <div>
                    <div class="form-group" v-if="revenue.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="revenue.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="revenue-date">Date</label>
                        <div class="input-group">
                            <input id="revenue-date" type="date" class="form-control" name="date"  :class="{'valid': !$v.revenue.date.$invalid, 'invalid': $v.revenue.date.$invalid }"
                            v-model="$v.revenue.date.$model"  required />
                        </div>
                        <div v-if="$v.revenue.date.$anyDirty && $v.revenue.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.revenue.date.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <b-row>
                            <b-col cols=9>
                                <label class="form-control-label" for="revenue-amount">Amount in ($)</label>
                                <input type="number" class="form-control" name="amount" id="revenue-amount"
                                    :class="{'valid': !$v.revenue.amount.$invalid, 'invalid': $v.revenue.amount.$invalid }" v-model.number="$v.revenue.amount.$model" />
                            </b-col>

                            <b-col cols=3>
                                <label class="form-control-label" for="revenue-successor">Successor</label>
                                <select class="form-control" name="successor" :class="{'valid': !$v.revenue.successor.$invalid, 'invalid': $v.revenue.successor.$invalid }" v-model="$v.revenue.successor.$model" id="revenue-successor"  required>
                                    <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                                    <option value="K" >K</option>
                                    <option value="M" >M</option>
                                    <!-- <option value="B" >B</option>
                                    <option value="T" >T</option> -->
                                </select>
                                <div v-if="$v.revenue.successor.$anyDirty && $v.revenue.successor.$invalid">
                                    <small class="form-text text-danger" v-if="!$v.revenue.successor.required">
                                        This field is required.
                                    </small>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <!-- <div class="form-group">
                        <label class="form-control-label" for="revenue-successor">Successor</label>
                        <select class="form-control" name="successor" :class="{'valid': !$v.revenue.successor.$invalid, 'invalid': $v.revenue.successor.$invalid }" v-model="$v.revenue.successor.$model" id="revenue-successor"  required>
                            <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                            <option value="K" >K</option>
                            <option value="M" >M</option>
                            <option value="B" >B</option>
                            <option value="T" >T</option>
                        </select>
                        <div v-if="$v.revenue.successor.$anyDirty && $v.revenue.successor.$invalid">
                            <small class="form-text text-danger" v-if="!$v.revenue.successor.required">
                                This field is required.
                            </small>
                        </div>
                    </div> -->
                    <div class="form-group">
                        <label class="form-control-label"  for="revenue-lineOfBusiness">Line Of Business</label>
                        <select class="form-control" id="revenue-lineOfBusiness" name="lineOfBusiness" v-model="revenue.lineOfBusiness">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="revenue.lineOfBusiness && lineOfBusinessOption.id === revenue.lineOfBusiness.id ? revenue.lineOfBusiness : lineOfBusinessOption" v-for="lineOfBusinessOption in lineOfBusinesses" :key="lineOfBusinessOption.id">{{lineOfBusinessOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.revenue.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./revenue-update.component.ts">
</script>
