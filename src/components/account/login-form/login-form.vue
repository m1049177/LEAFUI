<template>
  <div id='login-page' class="modal-body">
    <h6>Login</h6>
    <div class="row justify-content-center login">
      <div class="col-md-8">
        <b-alert show variant="danger" v-if="authenticationError">
          <strong>Failed to sign in!</strong> Please check your credentials and try again.
        </b-alert>
      </div>
      <div class="col-md-8">
        <b-form role="form" v-on:submit.prevent="doLogin()">
          <b-form-group>
            <b-form-input
              style="border: 2px solid #BCE0FD;
border-radius: 25px;"
              id="username"
              type="text"
              name="username"
              autofocus
              placeholder="Username"
              v-model="login"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              style="border: 2px solid #BCE0FD;
border-radius: 25px;"
              id="password"
              type="password"
              name="password"
              v-model.trim="name"
              placeholder="Password"
              v-model="password"
            >
              <font-awesome-icon icon="user" />
            </b-form-input>
          </b-form-group>
          <!-- <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" checked>
            <span>Remember me</span>
          </b-form-checkbox>-->
          <div style='text-align:center;margin-top:20px;'>
            <b-button type="submit" class="loginbtn" pill variant="primary">Sign in</b-button>
          </div>
        </b-form>
        <p></p>
        <div style='margin-top:20px;'>
          <b-link
            style="color:#b1afafe0"
            class="alert-link"
            @click="navigateFunction('resetPassword')"
          >Did you forget your password?</b-link>
        </div>
        <div>
            <b-link  style="color:#b1afafe0" @click="navigateFunction('Register')" class="alert-link">Register a new account</b-link>
        </div>
      </div>
  </div>
  </div>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
<style scoped>
.login {
  /* padding-top:1%; */
  width: 500px;
  height: 500px;
  margin: auto;
  border: 1px solid #b1afafe0;
}
h6 {
  text-align: center;
  font: Bold 32px/12px Arial;
  padding-bottom: 30px;
  padding-top:20px;
}
.loginbtn {
    border-radius: 20px;
    min-width: 110px;
    border: 3px solid #2699FB;
    color: black;
    background-color: #589DFE99;
}
</style>
