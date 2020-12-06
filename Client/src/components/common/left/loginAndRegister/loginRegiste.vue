<template>
  <div class="lgAndRgs">
    <login-item />
    <registe-item />
  </div>
</template>

<script>
import loginItem from "./login";
import registeItem from "./registe";
export default {
  name: "loginRegiste",
  components: {
    loginItem,
    registeItem,
  },
};
</script>

<style>
.lgAndRgs {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>