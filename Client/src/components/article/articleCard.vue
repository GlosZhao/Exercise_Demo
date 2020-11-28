<template>
  <div class="cardClass" :style="{ width: width }">
    <img
      :src="articleOBJ.facePath"
      class="imgAdapte"
      height="auto"
      width="100%"
    />   
    <span>
      {{ articleOBJ.title }}
    </span>
    <div class="articelDetil">{{ articleOBJ.description }}</div>
  </div>
</template>

<script>
export default {
  name: "articleCard",
  data() {
    return {
      title: "",
      facePath: "",
      description: "",
      _id: "",
    };
  },
  props: {
    articleOBJ: {
      type: Object,
      default() {
        return {};
      },
    },
    width: {
      type: String,
      default: "150px",
    },
  },
};
</script>

<style>

.cardClass {
  margin-bottom: 30px;
  break-inside: avoid;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.cardClass > span {
  font-size: 15px;
  font-weight: 500;
  padding: 5px 3px;
  border-bottom: 1px solid#E4E7ED;
}

.cardClass > .articelDetil {
  padding: 4px 2px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  /* height: 60px; */
  text-indent: 2em;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*选择在哪一行出现*/
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}




</style>