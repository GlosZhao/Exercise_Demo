<template>
  <div class="searchArea">
    <!-- 查询条件 -->
    <!-- <div class="searchCondition">
      <input
        type="text"
        class="searchInput"
        :value="inputData"
        @change="changeData"
      /> -->
    <!-- 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。 -->
    <div class="searchCondition">
      <input
        type="text"
        class="searchInput"
        v-model="inputData.searchData"
        value="inputData"
      />
      <button class="searchConfirm" @click="clickToSearch()">search</button>
    </div>
    <!-- 查询结果 -->
    <div class="showResult" v-show="resultJude == 0 ? false : true">
      <div v-for="item in queryResult" :key="item.id">
        <span class="resultBox-title">
          {{ item.title }}
        </span>
        <div class="resultBox-description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchBox",
  props: {
    // inputData: {
    //   type: String,
    //   default: {},
    // },
    inputData: {
      type: Object,
      default() {
        return {};
      },
    },
    queryResult: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      // Temp:this.queryResult
    };
  },
  methods: {
    // changeData(e) {
    //   this.inputData.searchDate = e.target.value;
    // },
    clickToSearch() {
      console.log(this.queryResult.length);
      this.$emit("commit", this.inputData.searchData);
    },
  },
  computed: {
    resultJude() {
      // console.log(this.queryResult.length);
      return this.queryResult.length;
    },
  },
};
</script>

<style>
.searchArea {
  width: 50%;
  min-width: 200px;
  height: 50px;
}
.searchCondition {
  height: 50px;
}
.searchInput {
  outline: none;
  height: 40px;
  width: calc(100% - 112px);
  border: 4px solid #76c2cc;
  border-top-left-radius: 42px;
  border-bottom-left-radius: 42px;
  float: left;
  padding-left: 18px;
  font-size: 18px;
}
.searchConfirm {
  outline: none;
  cursor: pointer;
  height: 50px;
  width: 80px;
  padding: 0;
  font-size: 23px;
  background-color: #76c2cc;
  border: 4px solid #76c2cc;
  border-right: 80px solid #76c2cc;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
}
.showResult {
  /* display: none; */
  position: relative;
  left: 4%;
  width: 90%;
  /* background-color: yellow; */
  border-radius: 6px;
  border: 2px solid #99dfe9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: white;
  z-index: 3;
}
.showResult > div {
  padding: 5px;
}
.showResult .resultBox-title {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.showResult .resultBox-description {
  margin: 5px;
  font-size: 12px;
  font-weight: 300;
  text-indent: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.showResult > div:hover {
  background-color: #d4f9ff;
  cursor: pointer;
}
</style>