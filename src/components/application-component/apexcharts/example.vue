<template>    
    <div id="chart" v-if="showCharts">
      <apexchart type=line height=200 :options="chartOptions" :series="series" />
    </div>
</template>
<script lang="ts" src='./example.ts'>

</script>