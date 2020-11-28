<template>
  <div class="mainLeft">
    <show-popout />
    <main-msg />
  </div>
</template>

<script>
import showPopout from './showPopout/showPopout';
import mainMsg from './showBlogMSG/mainMSG';
export default {
  name:'mainBlogCtrl',
  components: {
    showPopout,
    mainMsg,
  },
};
</script>

<style>
.mainLeft{
  position: fixed;
  z-index: 3;
  top: 0px;
  left: 0px;
  width: 140px;
  height: 100%;
}
</style>