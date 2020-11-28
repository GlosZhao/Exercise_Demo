<template>
  <div>
    <main-blog-ctrl />
    <div class="showBoard">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import mainBlogCtrl from "components/common/mainBlogControl/mainBlogCtrl";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  components: {
    mainBlogCtrl,
  },
  methods: {},

  mounted() {},
};
</script>

<style>
.showBoard {
  width: calc(100% - 180px);
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgb(240, 240, 240); */
  padding: 10px;
}
</style>
