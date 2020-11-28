<template>
  <div class="init">
    <!-- 初始界面 -->
    <common-cpn />
    <init-form />
  </div>
</template>

<script>
import commonCpn from "components/common/commonCpn";
import initForm from "components/initForm/initForm";

export default {
  name: "init",
  data() {
    return {};
  },
  computed: {},
  components: {
    commonCpn,
    initForm,
  },
};
</script>
<style>
.init {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
