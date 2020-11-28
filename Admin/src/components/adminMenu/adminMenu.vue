<template>
  <div class="adminMenu">
    <el-menu
      router
      :default-active="activeRoute"
      unique-opened
      background-color="#E9EEF3"
      text-color="#838485"
      active-text-color="#FF8053"
    >
      <el-submenu index="/">
        <template slot="title">文章管理</template>
        <!-- <el-menu-item-group ></el-menu-item-group> -->
        <el-menu-item
          v-for="item in routerCTL.Article"
          :key="item.name"
          :route="{ name: item.name }"
          :index="item.name"
        >
          {{ item.text }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item :route="routerCTL.Tags" :index="routerCTL.Tags.name">
        <span slot="title">标签管理</span>
      </el-menu-item>
      <el-menu-item route="/">
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item route="/">
        <span slot="title">博客控制</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "adminMenu",
  data() {
    return {
      routerCTL: {
        Article: [
          { name: "List", text: "列表" },
          { name: "Create", text: "新增" },
        ],
        Tags: { name: "tags" },
      },
    };
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style>
</style>