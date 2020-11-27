<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import $axios from "axios";
export default {
  name: "adminView",
  data() {
    return {
      tabPosition: "left",
    };
  },
  beforeRouteEnter(to, from, next) {
    $axios.interceptors.request.use(
      (request) => {
        if ($cookies.isKey("token")) {
          // Do something before request is sent
          request.headers.Authorization = $cookies.get("token");
        }
        return request;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    $axios
      .get("http://localhost:3000/api/checkAdmin", {})
      .then((res) => {
        if (res.data.isAdmin) {
          next();
        }
        // console.log(res);
      })
      .catch((err) => {
        alert("你没有权限");
        next(false);
        console.error(err);
      });
  },
};
</script>

<style>
</style>