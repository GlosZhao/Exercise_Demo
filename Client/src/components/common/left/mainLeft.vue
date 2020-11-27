<template>
  <div class="mainLeft">
    <login-registe />
    <main-msg />
  </div>
</template>

<script>
import loginRegiste from './loginAndRegister/loginRegiste';
import mainMsg from './showBlogMSG/mainMSG';
export default {
  name:'mainLeft',
  components: {
    loginRegiste,
    mainMsg,
  },
};
</script>

<style>
.mainLeft{
  position: fixed;
  z-index: 3;
  top: 0px;
  left: 0px;
  width: 140px;
  height: 100%;
}
</style>