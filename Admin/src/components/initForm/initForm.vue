<template>
  <div class="initFormClass" :class="getInputStatus ? 'login' : 'register'">
    <h1 style="padding-top: 20px; margin-bottom: 40px">Blog's Admin</h1>
      <login-sheet v-if="getInputStatus" />
      <register-sheet v-if="!getInputStatus" />
  </div>
</template>

<script>
import loginSheet from "./initFormCPN/loginSheet";
import registerSheet from "./initFormCPN/registerSheet";
export default {
  name: "initForm",
  data() {
    return {
    };
  },
  components: {
    loginSheet,
    registerSheet,
  },
  computed: {
    getInputStatus() {
      return this.$store.state.isLogin; //默认为true
    },
  },
};
</script>

<style>
.initFormClass {
  position: relative;
  width: 360px;
  top: 100px;
  left: calc(50vw - 180px);
  background-color: gainsboro;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: height 0.5s linear 0s;
}
.login {
  height: 325px;
}
.register {
  height: 380px;
}
</style>