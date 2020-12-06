<template>
  <div class="adminCPN_Board">
    <el-menu class="adminCPN_Board" :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" route="/adminView/insertArticle">发布文章</el-menu-item>
          <el-menu-item index="1-2" route="/adminView/showArticleList">显示文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
.adminCPN_Board {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 10vw;
}
</style>