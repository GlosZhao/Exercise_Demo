<template>
  <div>
    <div class="showHeadIcon">
      <!-- 博客标志部分 -->
      <h1>GLOS<br />Blog</h1>
    </div>
    <div class="showAdminText">
      <h1>Admin</h1>
      <span></span>
    </div>
    <div class="ContactInfo">
      <div>
        <a href="https://github.com/GlosZhao"> Github </a>
      </div>
      <div>
        <a href="https://gitee.com/GlosZhao"> Gitee </a>
      </div>
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
  margin: 0;
  width: 120px;
  height: 90px;
  white-space: nowrap;
  line-height: 40px;
  font-size: 50px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.showAdminText {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 70px solid lightseagreen;
  border-right: 70px solid lightseagreen;
  border-left: 70px solid transparent;
  border-bottom: 70px solid transparent;
}
.showAdminText > h1 {
  position: relative;
  bottom: 130px;
  right: 37px;
  font-size: 50px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  transform: rotateZ(45deg);
}
.ContactInfo {
  display: block;
  position: absolute;
  top: calc(50vh - 70px);
  left: 0px;
  width: 140px;
  height: 140px;
}
.ContactInfo > div {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ContactInfo div:first-child {
  background-color: lightskyblue;
}
.ContactInfo div:last-child {
  background-color: cornflowerblue;
}
.ContactInfo a {
  text-decoration-line: none;
  color: black;
  font-size: 40px;
  font-weight: 600;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>