<template>
  <div class="showAllTags">
    <div
      v-for="item in tagsList"
      :key="item.id"
      @click="clickTag(item)"
      class="tagClass"
    >
      
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {};
  },
  props: {
    tagsList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    clickTag(item) {
      this.$emit("tagsValueToSearch", "tags:" + item);
    },
  },
};
</script>

<style>
.showAllTags {
  position: absolute;
  bottom: 180px;
  width: 90%;
  height: 40%;
  border: 1px solid #00000018;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 15px;
  display: flex;
}

.tagClass {
  height: 24px;
  font-size: 20px;
  border-radius: 24px;
  padding: 9px;
  border: 2px solid rgba(182, 166, 255, 0.205);
  margin: 5px;
}
.tagClass:hover {
  background-color: rgb(135, 175, 248);
  cursor: pointer;
}
</style>