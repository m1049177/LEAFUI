<template>
    <div>
        <b-button class='backButton' @click='back()'> Back</b-button>
        <h2>Search Results</h2>
        <h6 v-if='applications.length !== 0 || technologies.length !== 0'>Application Related Search</h6>
        <table class="table table-striped">
            <thead v-if='applications.length !== 0 || technologies.length !== 0'>
                <tr>
                    <th><span>Application Id</span></th>
                    <th><span>Application Name</span></th>
                    <th><span>Application-Status</span></th>
                    <th><span>Organizational level Details</span></th>
                    <th><span>LOB Details and hierachy</span></th>
                    <th><span>Technology Details</span></th>
                </tr>
            </thead>
            <tbody v-if="applications.length !== 0">
                <tr v-for="application in applications" :key="application.id">
                    <td><span>{{application.id}}</span></td>
                    <td>
                        <router-link :to="{name: 'ApplicationView', params: {applicationId: application.id}}">{{application.name}}
                        </router-link>
                    </td>
                    <td><span>{{application.status}}</span></td>
                    <td>
                        <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: application.lineOfBusiness.oraganizationalUnit.id}}">{{application.lineOfBusiness.oraganizationalUnit.name}}
                        </router-link></td>
                    <td>
                        <router-link :to="{name: 'SearchDetail',  params: { type: 'lob', id: application.lineOfBusiness.id}}">{{application.lineOfBusiness.name}}
                        </router-link>
                    </td>
                    <div v-for='technology in technologies' :key='technology.id'>
                    <td v-if='technology.application.id == application.id'>
                        <router-link :to="{name: 'SearchDetail', params: { type: 'techical', id: technology.id}}">{{technology.technologyStack.name}}
                        </router-link>
                    </td>
                    </div>
                </tr>
            </tbody>
            <tbody v-if="applications.length == 0 && technologies.length !== 0">
                <tr v-for="tech in technologies" :key="tech.id">
                    <td><span>{{tech.application.id}}</span></td>
                    <td> 
                        <router-link :to="{name: 'ApplicationView', params: {applicationId: tech.application.id}}">{{tech.application.name}}
                        </router-link>
                    </td>
                    <td><span>{{tech.application.status}}</span></td>
                    <td>
                        <router-link :to="{name: 'OraganizationalUnitView', params: {oraganizationalUnitId: tech.application.lineOfBusiness.oraganizationalUnit.id}}">{{tech.application.lineOfBusiness.oraganizationalUnit.name}}
                        </router-link></td>
                    <td>
                        <router-link :to="{name: 'SearchDetail', params: { type: 'lob', id: tech.application.lineOfBusiness.id}}">{{tech.application.lineOfBusiness.name}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'SearchDetail', params: { type: 'techical', id: tech.id}}">{{tech.technologyStack.name}}
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

    <h6 v-if="activity.length !== 0">BusinessFunction Related Search</h6>
        <table class="table table-striped" v-if="activity.length !== 0"> 
            <thead >
                <tr>
                    <th><span>Activity</span></th>
                    <th><span>Business Process</span></th>
                    <th><span>Business Process-Status</span></th>
                    <th><span>Capability</span></th>
                    <th><span>Business Function</span></th>
                    <th><span>LOB Details and hierachy</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in activity" :key="data.id">
                    <td> 
                        <router-link :to="{name: 'ActivityView', params: {activityId: data.id}}">{{data.name}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'BusinessProcessView', params: {businessProcessId: data.businessProcess.id}}">{{data.businessProcess.name}}
                        </router-link>
                    </td>
                    <td><span>{{data.businessProcess.status}}</span></td>
                    <td>
                        <router-link :to="{name: 'CapabilitiesView', params: {capabilitiesId: data.businessProcess.capabilities.id}}">{{data.businessProcess.capabilities.description}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'BusinessFunctionView', params: {businessFunctionId: data.businessProcess.capabilities.businessFunction.id}}">{{data.businessProcess.capabilities.businessFunction.name}}
                        </router-link>
                    </td>
                    <td>
                        <router-link :to="{name: 'SearchDetail', params: { type: 'lob', id: data.businessProcess.capabilities.businessFunction.lineOfBusiness.id}}">{{data.businessProcess.capabilities.businessFunction.lineOfBusiness.name}}
                        </router-link>
                    </td>
                </tr>
            </tbody>            
        </table>
 
        <h5 v-if="activity.length == 0 && applications.length == 0 && technologies.length == 0">
            Sorry! No result found for your search
        </h5>
    </div>
</template>
<script lang='ts' src='./search.ts'>

</script>
<style>
.backButton {
    margin-right: 30px;
    width: 10%;
    background-color: #313D53E6;
    color: white;
    border-radius: 10px;
    float: right;
}
</style>