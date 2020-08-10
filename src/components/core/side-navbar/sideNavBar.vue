<template>
    <div id='sidenav' v-bind:style="{ width: sideNavWidth+'px'}"
        @mouseleave="decrease()"
        @mouseover="increase()">
        <div id="home" class="wordings" @click="navigateFunction('Home')">
            <font-awesome-icon class='IconClass' icon="home" />
                <span  v-if="sideNavWidth > 56">Home</span> 
          </div>  
        <div id='appPortfolio' class="wordings" @click="navigateFunction('AppPortfolio')">
            <font-awesome-icon class='IconClass' icon="cubes" />
                <span  v-if="sideNavWidth > 56">App Portfolio</span> 
          </div> 
        <div id='technicalView' class="wordings" @click="navigateFunction('TechnicalView')">
            <font-awesome-icon class='IconClass' icon="cogs" />
                <span  v-if="sideNavWidth > 56">Technical View</span> 
          </div>
        <div id='functional-view' class="wordings" @click="navigateFunction('FunctionalView')">
            <font-awesome-icon class='IconClass' icon="chalkboard-teacher" />
                <span  v-if="sideNavWidth > 56">Functional View</span> 
          </div>
        <div id='drawGojs' class="wordings" @click="navigateFunction('DrawToolGoJS')">
            <font-awesome-icon class='IconClass' icon="pencil-alt" />
                <span  v-if="sideNavWidth > 56">Draw Tool</span> 
          </div>      
    </div>
</template>
<script lang='ts' src='./sideNavBar.ts'>

</script>
<style scoped>
#sidenav{
    background: #313D53E6 0% 0% no-repeat padding-box;
    opacity: 1;
    height: 100%;
    width: 60px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.home{
    margin-top:20px;
}
.IconClass{
    background-color: #313D53;
    width: 35px;
    height: 30px;
    margin: 0px 10px;
    padding: 5px;
}
.wordings{
    margin-top: 15px;
    color: white;
    font-size: 20px;
    font-weight: 300;
}
#home:hover{
    font-weight: 500;
}
#appPortfolio:hover{
    font-weight: 500;
}
#technicalView:hover{
    font-weight: 500;
}
#functional-view:hover{
    font-weight: 500;
}
#drawGojs:hover{
    font-weight: 500;
}
</style>