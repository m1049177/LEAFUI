<template>

  <div class="integration">
      <b-button style="margin-left:100px;width:150px;" variant="primary" @click="close()"><font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span></b-button>
      <h5 v-if="!showIntegration"> No integrationfor this application</h5>
      <section>
        <slot name="body">
            <div ref="joint" id="myholder">

            </div>
        </slot>
       </section>
  </div>
</template>
<script lang='ts' src='./integration-app.ts'>

</script>
<style scoped>
.integration{
    display: flex;
    flex-direction: column;
    width: 80%;
    max-height: 600px;
}
  .modal {
    /* background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px; */
        position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    display: flex;
    flex-direction: column;
    width: 80%;
    max-height: 600px;
    margin: auto;
    margin-top: 120px;
    margin-left: 130px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>