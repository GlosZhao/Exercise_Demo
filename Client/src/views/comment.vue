<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <el-card shadow="hover" class>{{item}}</el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5],
    };
  },
};
</script>

<style>


</style>