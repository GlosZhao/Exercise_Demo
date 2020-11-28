<template>
  <el-container>
    <el-header>
      <admin-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 管理目录 -->
        <admin-menu />
      </el-aside>
      <el-main class="mainBorderClass">
        <el-scrollbar class="elScroller">
          <!-- 具体功能视图 -->
          <!-- <keep-alive> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import adminMenu from "../adminMenu/adminMenu";
import adminHeader from "components/adminHeader/adminheader";
export default {
  name: "adminView",
  components: {
    adminMenu,
    adminHeader,
  },
  computed: {},
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: calc(100vh - 60px);
}
.el-main.mainBorderClass {
  background-color: #e9e9e950;
  padding: 0px;
  height: calc(100vh - 60px);
}
.el-scrollbar.elScroller {
  width: 100%;
  height: 100%;
}
div.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>