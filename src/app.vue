<template>
  <div id="app">
    <!-- <ribbon></ribbon> -->
    <div id="app-header" v-if="authenticated">
      <jhi-navbar></jhi-navbar>
    </div>
    <div class="container-fluid">
      <div class="card" v-if="authenticated">
        <router-view></router-view>
      </div>
        <div v-if="!authenticated && !register && !resetPassword"><login-form></login-form></div>
        <div v-if='register'><register/></div>
        <div v-if='resetPassword'><reset-password/></div>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>
<style scoped>
.card {
  padding:1.0%; 
  padding-top: 10px;
  border: none;
  margin-left:40px;
  background-color: whitesmoke;
}
</style>
