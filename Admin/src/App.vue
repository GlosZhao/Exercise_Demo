<template>
  <div id="app">
    <!-- 初始界面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>
<style>
@import "assets/css/base.css";
#app {
  min-width: 960px;
  min-height: 550px;
}
</style>

