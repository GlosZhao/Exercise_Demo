<template>
  <div id="app">
    <common-cpn v-if="getIsView" />
    <router-view class="showBoard" v-if="getIsView" />
    <admin-c-p-n v-if="!getIsView" />
    <router-view class="menagementBoard" v-if="!getIsView" />
  </div>
</template>

<script>
import commonCpn from "./components/common/commonCpn";
import adminCPN from './components/admin/adminCPN'
export default {
  components: {
    commonCpn,
    adminCPN
  },
  methods: {},
  computed: {
    getIsView() {
      return !this.$store.state.isView;
    },
  },
};
</script>

<style>
@import "./assets/css/base.css";
.showBoard {
  width: 1000px;
  height: 2000px;
  position: relative;
  left: calc(50% - 505px);
  top: 70px;
  background-color: rgb(240, 240, 240);
  padding: 10px;
}
.menagementBoard {
  width: 90vw;
  height: 100vh;
  position: absolute;
  left: 10vw;
}
</style>
