<template>
  <div id="commonCpn">
    <main-left />
    <main-right />
    <main-control />
  </div>
</template>

<script>
import mainLeft from "./left/mainLeft";
import mainRight from "./right/mainRight";
import mainControl from "./mainControl/mainControl";
export default {
  name: "commonCpn",
  data() {
    return {
      
    }
  },
  components: {
    mainLeft,
    mainRight,
    mainControl,
  },
  computed: {},

};
</script>

<style>
</style>