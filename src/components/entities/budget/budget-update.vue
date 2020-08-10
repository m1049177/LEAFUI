<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.budget.home.createOrEditLabel">Create or edit a Budget</h2>
                <div>
                    <div class="form-group" v-if="budget.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="budget.id" readonly />
                    </div>
                    <div class="form-group">
                        <b-row>
                            <b-col cols=9>
                                <label class="form-control-label" for="budget-amount">Amount in($)</label>
                                <input type="number" class="form-control" name="amount" id="budget-amount"
                                    :class="{'valid': !$v.budget.amount.$invalid, 'invalid': $v.budget.amount.$invalid }" v-model.number="$v.budget.amount.$model"  required/>
                                <div v-if="$v.budget.amount.$anyDirty && $v.budget.amount.$invalid">
                                    <small class="form-text text-danger" v-if="!$v.budget.amount.required">
                                        This field is required.
                                    </small>
                                    <small class="form-text text-danger" v-if="!$v.budget.amount.number">
                                        This field should be a number.
                                    </small>
                                </div>
                            </b-col>
                            <b-col cols=3>
                                <label class="form-control-label" for="budget-successor">Successor</label>
                                <select class="form-control" name="successor" :class="{'valid': !$v.budget.successor.$invalid, 'invalid': $v.budget.successor.$invalid }" v-model="$v.budget.successor.$model" id="budget-successor"  required>
                                    <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                                    <option value="K" >K</option>
                                    <option value="M" >M</option>
                                    <!-- <option value="B" >B</option>
                                    <option value="T" >T</option> -->
                                </select>
                                <div v-if="$v.budget.successor.$anyDirty && $v.budget.successor.$invalid">
                                    <small class="form-text text-danger" v-if="!$v.budget.successor.required">
                                        This field is required.
                                    </small>
                                </div>
                            </b-col>
                        </b-row>
                    </div>


                    <div class="form-group">
                        <label class="form-control-label" for="budget-year">Year</label>
                        <input type="number" class="form-control" name="year" id="budget-year"
                            :class="{'valid': !$v.budget.year.$invalid, 'invalid': $v.budget.year.$invalid }" v-model.number="$v.budget.year.$model"  required/>
                        <div v-if="$v.budget.year.$anyDirty && $v.budget.year.$invalid">
                            <small class="form-text text-danger" v-if="!$v.budget.year.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.budget.year.number">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <!-- <div class="form-group">
                        <label class="form-control-label" for="budget-successor">Successor</label>
                        <select class="form-control" name="successor" :class="{'valid': !$v.budget.successor.$invalid, 'invalid': $v.budget.successor.$invalid }" v-model="$v.budget.successor.$model" id="budget-successor"  required>
                            <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                            <option value="K" >K</option>
                            <option value="M" >M</option>
                            <option value="B" >B</option>
                            <option value="T" >T</option>
                        </select>
                        <div v-if="$v.budget.successor.$anyDirty && $v.budget.successor.$invalid">
                            <small class="form-text text-danger" v-if="!$v.budget.successor.required">
                                This field is required.
                            </small>
                        </div>
                    </div> -->
                    <div class="form-group">
                        <label class="form-control-label"  for="budget-application">Application</label>
                        <select class="form-control" id="budget-application" name="application" v-model="budget.application" required>
                            <option v-if="!budget.application" v-bind:value="null" selected></option>
                            <option v-bind:value="budget.application && applicationOption.id === budget.application.id ? budget.application : applicationOption" v-for="applicationOption in applications" :key="applicationOption.id">{{applicationOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.budget.application.$anyDirty && $v.budget.application.$invalid">
                        <small class="form-text text-danger" v-if="!$v.budget.application.required">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.budget.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./budget-update.component.ts">
</script>
