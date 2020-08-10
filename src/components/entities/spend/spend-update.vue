<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="leafClient3App.spend.home.createOrEditLabel">Create or edit a Spend</h2>
                <div>
                    <div class="form-group" v-if="spend.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="spend.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="spend-dateOfUpdate">Date Of Update</label>
                        <div class="input-group">
                            <input id="spend-dateOfUpdate" type="date" class="form-control" name="dateOfUpdate"  :class="{'valid': !$v.spend.dateOfUpdate.$invalid, 'invalid': $v.spend.dateOfUpdate.$invalid }"
                            v-model="$v.spend.dateOfUpdate.$model"  required />
                        </div>
                        <div v-if="$v.spend.dateOfUpdate.$anyDirty && $v.spend.dateOfUpdate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.spend.dateOfUpdate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <b-row>
                            <b-col cols=9>
                                <label class="form-control-label" for="spend-amount">Amount in ($)</label>
                                <input type="number" class="form-control" name="amount" id="spend-amount"
                                    :class="{'valid': !$v.spend.amount.$invalid, 'invalid': $v.spend.amount.$invalid }" v-model.number="$v.spend.amount.$model"  required/>
                                <div v-if="$v.spend.amount.$anyDirty && $v.spend.amount.$invalid">
                                    <small class="form-text text-danger" v-if="!$v.spend.amount.required">
                                        This field is required.
                                    </small>
                                    <small class="form-text text-danger" v-if="!$v.spend.amount.number">
                                        This field should be a number.
                                    </small>
                                </div>
                            </b-col>
                            <b-col cols=3>
                                <label class="form-control-label" for="spend-successor">Successor</label>
                                <select class="form-control" name="successor" :class="{'valid': !$v.spend.successor.$invalid, 'invalid': $v.spend.successor.$invalid }" v-model="$v.spend.successor.$model" id="spend-successor"  required>
                                    <option value="NOSUCCESSOR" >NOSUCCESSOR</option>
                                    <option value="K" >K</option>
                                    <option value="M" >M</option>
                                    <!-- <option value="B" >B</option>
                                    <option value="T" >T</option> -->
                                </select>
                                <div v-if="$v.spend.successor.$anyDirty && $v.spend.successor.$invalid">
                                    <small class="form-text text-danger" v-if="!$v.spend.successor.required">
                                        This field is required.
                                    </small>
                                </div>
                            </b-col>
                        </b-row>
                        
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="spend-expenditureType">Expenditure Type</label>
                        <select class="form-control" name="expenditureType" :class="{'valid': !$v.spend.expenditureType.$invalid, 'invalid': $v.spend.expenditureType.$invalid }" v-model="$v.spend.expenditureType.$model" id="spend-expenditureType"  required>
                            <option v-for="label in labelData.label_data" :key='label.id' v-bind:value="label.name" >{{label.name}}</option>
                        </select>
                        <div v-if="$v.spend.expenditureType.$anyDirty && $v.spend.expenditureType.$invalid">
                            <small class="form-text text-danger" v-if="!$v.spend.expenditureType.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                     <div class="form-group" v-if="$v.spend.expenditureType.$model==='INFRA'">
                        <label class="form-control-label" for="cost-technology">Spend ID</label>
                        <select class="form-control" id="cost-technology" name="spendId" v-model.number="$v.spend.spendId.$model">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="spend.technology && technologyOption.id === spend.technology.id ? spend.technology.id : technologyOption.id" v-for="technologyOption in infraTechnologies" :key="technologyOption.id">{{technologyOption.application.name}} - {{technologyOption.technologyStack.name}}</option>
                        </select>
                    </div>
                     <div class="form-group" v-if="$v.spend.expenditureType.$model==='LICENSE'">
                        <label class="form-control-label" for="cost-technology">Spend ID</label>
                        <select class="form-control" id="cost-technology" name="spendId" v-model.number="$v.spend.spendId.$model">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="spend.technology && technologyOption.id === spend.technology.id ? spend.technology.id : technologyOption.id" v-for="technologyOption in licenseTechnologies" :key="technologyOption.id">{{technologyOption.application.name}} - {{technologyOption.technologyStack.name}}</option>
                        </select>
                    </div>
                
                     <div class="form-group" v-if="$v.spend.expenditureType.$model !='INFRA' && $v.spend.expenditureType.$model !='LICENSE'">
                        <label class="form-control-label" for="cost-technology">Spend ID</label>
                        <select class="form-control" id="cost-technology" name="spendId" v-model.number="$v.spend.spendId.$model">
                            <option v-bind:value="null"></option>
                             <option v-bind:value="expenditureData.type === spend.expenditureType ? expenditureData.expenditure.id : ''"
                             v-for="expenditureData in expenditureCategories" :key='expenditureData.id'>{{expenditureData.expenditure.description}} - {{expenditureData.expenditure.application.name}}</option>
                                                        
                        </select>
                    </div>
                   
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.spend.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./spend-update.component.ts">
</script>
