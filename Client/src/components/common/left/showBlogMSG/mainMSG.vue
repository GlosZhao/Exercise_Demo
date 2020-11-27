<template>
  <div>
    <div class="showHeadIcon">
      <!-- 博客标志部分 -->
      <h1>GLOSBlog</h1>
    </div>
    <div class="ContactInfo">
      <a href="https://github.com/GlosZhao">
        <h3>MyGithub</h3>
      </a>
      <el-divider></el-divider>
      <el-popover placement="top" title="联系邮箱" width="200" trigger="click">
        <h3>greaouse@163.com</h3>
        <!-- <el-button slot="reference">click 激活</el-button> -->
        <h3 slot="reference">myEmail</h3>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainMsg",
};
</script>

<style>
.showHeadIcon {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 140px;
  height: 140px;
  background-color: indianred;
  border-bottom-right-radius: 100%;
}
.showHeadIcon > h1 {
  position: absolute;
  color: black;
  margin: 0;
  line-height: 40px;
  font-size: 30px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.ContactInfo {
  display: block;
  position: absolute;
  top: calc(50% - 70px);
  left: 0px;
  width: 140px;
  height: 140px;
  background-color: cornflowerblue;
  text-align: center;
}
.ContactInfo a {
  text-decoration-line: none;
  color: black;
}

.ContactInfo h3 {
  color: black;
  margin: 16px 0;
  line-height: 34px;
  font-size: 30px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>