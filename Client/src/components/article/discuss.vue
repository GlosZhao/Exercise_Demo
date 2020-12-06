<template>
  <div>
    <el-card body-style="padding:10px">
      <el-header height="20px">username</el-header>
      <el-main style="padding:5px 25px">说了个崔子</el-main>
      <el-footer height="15px" class="footerDivider">
        <el-divider  content-position="left">Date</el-divider>
      </el-footer>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "discuss",
};
</script>

<style>
.footerDivider>div{
  margin: 10px  0px 0px 0px;
}
</style>