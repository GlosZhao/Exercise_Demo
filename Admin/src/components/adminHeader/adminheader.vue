<template>
  <div class="adminHeader">
    <h3>{{ LoginName }}</h3>
    <el-link :underline="false" @click="clearCookies()">退出登录</el-link>
  </div>
</template>

<script>
export default {
  name: "adminHeader",
  data() {
    return {
      LoginName: this.$cookies.get("loginName"),
    };
  },
  methods: {
    clearCookies() {
      let cookiesArr = this.$cookies.keys();
      console.log(cookiesArr);
      if (cookiesArr.length != 0) {
        cookiesArr.forEach((value) => {
          this.$cookies.remove(value);
        });
        this.$router.replace("/");
        this.$router.go(0);
      } else {
        this.$router.replace("/");
        this.$router.go(0);
      }
    },
  },
};
</script>

<style>
.adminHeader {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.adminHeader > h3 {
  font-size: 20px;
  line-height: 1;
}
</style>