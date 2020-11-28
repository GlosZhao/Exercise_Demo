<template>
  <div class="commonCpn">
    <main-m-s-g/>
  </div>
</template>

<script>
import mainMSG from "./showBlogMSG/mainMSG";
export default {
  name: "commonCpn",
  data() {
    return {  
    }
  },
  components: {
    mainMSG,
  },
  computed: {},

};
</script>

<style>
.commonCpn{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vw;
}
</style>