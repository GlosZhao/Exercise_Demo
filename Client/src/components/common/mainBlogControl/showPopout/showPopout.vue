<template>
  <div class="lgAndRgs">
    <about-item />
    <search-item />
  </div>
</template>

<script>
import aboutItem from "./about";
import searchItem from "./search";
export default {
  name: "showPopout",
  components: {
    aboutItem,
    searchItem,
  },
};
</script>

<style>
.lgAndRgs {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>