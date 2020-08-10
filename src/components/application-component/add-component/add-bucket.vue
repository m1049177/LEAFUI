<template>
    <div>
        <div class="row justify-content-center" v-if="addString == 'bucket'">
            <div class="col-8">
            <form name="addBucketForm" role="form" novalidate v-on:submit.prevent="addnewBucket()" >
                <h2 id="addnew.bucket">Add new Bucket</h2>
                <div>
                    <div class="form-group">
                        <label class="form-control-label" for="bucket-name">Bucket Name</label>
                        <input type="text" class="form-control" name="name" id="bucket-name" v-model="bucketName" required
                        :class="{'valid': !$v.bucketName.$invalid, 'invalid': $v.bucketName.$invalid }" />
                        <!-- <div v-if="!$v.bucketName.checkForExistences">
                                <b style="color:red;"> Already exists</b>
                            </div> -->
                    </div>
                </div>
                <div class="form-group">
                    <b-form-checkbox id="versionRisk" 
                    size="lg" name="versionRisk"
                    value=true
                    unchecked-value=false
                    v-model="versionRisk"> Is this Bucket have version based risks?
                    </b-form-checkbox>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" class="btn btn-primary" :disabled="$v.bucketName.$invalid">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
         <div v-if="addString == 'spendType'">
            <div class="col-8">
            <form name="addSpendTypeForm" role="form" novalidate v-on:submit.prevent="addSpendType()" >
                <h2 id="addnew.spendType">Add new SpendType</h2>
                <div>
                    <div class="form-group">
                        <label class="form-control-label" for="spendType-name">New Spend Type</label>
                        <input type="text" class="form-control" name="name" id="spendType-name" v-model="spendType" required
                        :class="{'valid': !$v.spendType.$invalid, 'invalid': $v.spendType.$invalid }" />
                        <!-- <div v-if="!$v.spendType.checkForExistences">
                                <b style="color:red;"> Already exists</b>
                            </div> -->
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" class="btn btn-primary" :disabled="$v.spendType.$invalid">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
           
        </div>
          <b-modal id="typeModal" title="BootstrapVue">
    <p class="my-4">Spend Type Already exists</p>
  </b-modal>
            <b-modal id="bucketModal" title="BootstrapVue">
    <p class="my-4">Bucket Type Already exists</p>
  </b-modal>
    </div>
</template>
<script lang='ts' src='./add-bucket.ts'>

</script>
<style scoped>

</style>
