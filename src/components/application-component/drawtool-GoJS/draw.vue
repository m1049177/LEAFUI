<template>
<div>
    <h6>Saved Pictures</h6>
    <div v-if="show">
    <b-row v-for='diagram in diagramData' :key='diagram.id'>
        <dl>    
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
        </dl>
        <div>
        <b-button variant='danger' style="float:right;margin: 0px 10px;" @click='remove(diagram.id)'>Delete Image</b-button>
        <b-button variant='primary' style="float:right; margin: 0px 10px;" @click='download(diagram.picture)'>Download Image</b-button>
        </div>
      </b-row>
    </div>
</div>
</template>
<script lang='ts' src='./draw.component.ts'>
</script>
<style scoped>

</style>