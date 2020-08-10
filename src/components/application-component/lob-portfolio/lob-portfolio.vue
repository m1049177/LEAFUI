<template>
  <div>
      <h2> 
          <font-awesome-icon style='height:25px;width:25px;margin-left:3px;' icon="cubes" /> 
            App Portfolio - LOB
      </h2>
    <div class="row">
      <div class="col-md-12">
        <h3 class="text-center">{{status}} Applications</h3>
        <hr />
      </div>
    </div>
    <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
      <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;
      <span>Back</span>
    </button>
    <section style="margin-left: 10px;padding-top:20px">
      <div
        v-for="(row, rowIndex) in get2DArrary(lobApplicationsCount.slice(0, lobApplicationsCount.length),4)"
        :key="rowIndex"
        class="row ex"
      >
        <div v-for="item in row" :key="item.lobName" class="col-md-3">
          <b-card-group deck>
            <b-card style="background-color: whitesmoke">
              <b-card-header style="background-color: powderblue;font-weight: bold;">{{item.lobName}}</b-card-header>
              <b-card-body>
                <b-row>
                  <b-col cols="6" style="border-right:1px solid black">
                    <p>Apps Count</p>
                    <svg width="50" height="50">
                      <circle
                        cx="22"
                        cy="25"
                        r="20"
                        stroke="rgb(14, 57, 90)"
                        stroke-width="2"
                        fill="#FFFFFF"
                      />
                      <text
                        fill="black"
                        font-size="13"
                        font-weight="500"
                        font-family="Verdana"
                        x="14"
                        y="28"
                      >{{item.applicationsCount}}</text>
                    </svg>
                    <!-- <h5>{{item.applicationsCount}}</h5> -->
                  </b-col>
                  <b-col cols="6">
                    <p>Spend</p>
                    <div v-for="lobSpend in lobSpendDetails" :key="lobSpend.rowIndex">
                      <h4
                        v-if="lobSpend.status ===status && lobSpend.lobName === item.lobName"
                      >${{lobSpend.spend}}</h4>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./lob-portfolio.ts">
</script>

<style lang="scss" scoped>
.ex {
  padding-bottom: 3rem;
}
h3,
h4 {
  color: rgb(14, 57, 90);
  font-weight: bold;  
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
</style>>