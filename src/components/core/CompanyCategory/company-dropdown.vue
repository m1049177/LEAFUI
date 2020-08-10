<template>
    <div>
        <select class="form-control dropdown-class" v-model="selectedCompanyId" v-on:change="CompanyChange()">
            <option v-for="companyDetail in companyDetails" :key="companyDetail.id" 
             v-bind:value="companyDetail.id" name="companyId">
                <span>{{companyDetail.companyName}}</span></option>
        </select>
    </div>
</template>
<script lang='ts' src='./company-dropdown.ts'>

</script>
<style scoped>
.dropdown-class{
    background-color: #313D53;
    color: white;
    font-size: 17px;
    font-weight: 800;
    border: 0px;
    margin-top: -7px;
}
</style>