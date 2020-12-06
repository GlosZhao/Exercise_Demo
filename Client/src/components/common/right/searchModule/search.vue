<template>
  <div class="search">
    <div class="searchContent">
      <div class="searchBlock">
        <i class="el-icon-search"></i>
        <div class="searchInput">
          <el-input placeholder="请输入内容" v-model="searchData" @change="setInputData">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchItem",
  data() {
    return {
      searchData:''
    }
  },
  methods: {
    setInputData(){
      let data = sessionStorage.getItem("articleList")
      console.log(data);
    }
  },
  computed: {
    getlist(){
      
    }
  },
};
</script>

<style>
.search {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 300px;
  height: 100px;
  /* background-color: skyblue; */
}
.searchContent {
  position: relative;
  right: 120px;
  top: calc(50% - 30px);
  width: 420px;
  height: 60px;
  overflow: hidden;
}
.searchBlock {
  position: relative;
  left: 370px;
  width: 500px;
  height: 60px;
  background-color:lightskyblue;
  transition: transform 1s ease 0s;
}

.searchBlock:hover {
  transform: translateX(-450px);
}

.searchBlock i {
  position: relative;
  top: calc(50% - 15px);
  font-size: 30px;
}

.searchBlock > i {
  display: inline-block;
  top: calc(50% - 20px);
  left: 10px;
  font-size: 40px;
}
.searchInput {
  display: inline-block;
  width: 400px;
  position: absolute;
  top: calc(50% - 20px);
  right: 10px;
}

.searchInput input {
  height: 40px;
  font-size: 20px;
}
</style>