<template>
<!-- 开关按钮 -->
  <div
    class="blog-switch"
    :class="{ 'blog-switch-on': value, 'blog-switch-disabled': disabled }"
    :style="{ fontSize: size, backgroundColor: CalBgColor }"
    @click="handleChange"
  >
    <div class="blog-switch-node"></div>
  </div>
</template>

<script>
export default {
  name: "blogSwitch",
};
</script>

<style>
</style>