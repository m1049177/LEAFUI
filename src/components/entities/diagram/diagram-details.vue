<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="diagram">
                <h2 class="jh-entity-heading"><span>Diagram</span> {{diagram.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Category</span>
                    </dt>
                    <dd>
                        <span>{{diagram.category}}</span>
                    </dd>
                    <dt>
                        <span>Picture</span>
                    </dt>
                    <dd>
                        <div v-if="diagram.picture">
                            <a v-on:click="openFile(diagram.pictureContentType, diagram.picture)">
                                <img v-bind:src="'data:' + diagram.pictureContentType + ';base64,' + diagram.picture" style="max-width: 100%;" alt="diagram image"/>
                            </a>
                            {{diagram.pictureContentType}}, {{byteSize(diagram.picture)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Company</span>
                    </dt>
                    <dd>
                        <div v-if="diagram.company">
                            <router-link :to="{name: 'CompanyView', params: {companyId: diagram.company.id}}">{{diagram.company.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="diagram.id" :to="{name: 'DiagramEdit', params: {diagramId: diagram.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./diagram-details.component.ts">
</script>
