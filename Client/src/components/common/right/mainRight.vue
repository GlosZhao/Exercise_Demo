<template>
  <div class="mainRight">
    <search-item />
    <tag />
  </div>
</template>

<script>
import searchItem from "./searchModule/search";
import tag from "./TagModle/tag";
export default {
  name: "mainRight",
  components: {
    searchItem,
    tag,
  },
};
</script>

<style>
.mainRight{
  position: fixed;
  top: 0;
  z-index: 2;
  right: 0px;
}

</style>