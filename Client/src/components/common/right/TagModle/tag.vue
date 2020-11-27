<template>
  <div class="tagBox">
    <el-divider>
      <label>文章标签</label>
    </el-divider>
    <div class="showtag">
      <div v-for="item in TagsArr" :key="item.id">
        <el-tag>{{ item }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {
      TagsArr:[],
    };
  },
  mounted() {
    this.$axios
      .get("http://localhost:3000/api/tag/AllTag", {
        headers: {
          Authorization: $cookies.get("token"),
        },
      })
      .then((res) => {
        // 校验后端返回的code
        res.data.forEach((key) => {
          this.TagsArr.push(key.tagName);
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.tagBox {
  position: relative;
  top: 100px;
  width: 200px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.showtag {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 80%;
}

.showtag > div {
  height: 40px;
}
.showtag > div > span {
  margin: 3px;
  border-radius: 20px;
  cursor: pointer;
}
.showtag > div > span:hover {
  background-color: #117ce7;
  color: black;
}
</style>