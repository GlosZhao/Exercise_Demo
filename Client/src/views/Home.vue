<template>
  <div class="home">
    <div v-for="item in items" :key="item.index">
      <!-- 将文章ID传到详情页面 -->
      <router-link :to="{path:'/article', query: {_id: item._id }}">
        <el-card class="showTitleCard">
          <el-image
            style="width: 100px; height: 100px"
            :lazy="true"
            :src="item.faceImg"
            fit="contain"
          ></el-image>
          <div class="showCardLine">
            <h3>{{item.title}}</h3>
            <div class="description">
              <p class="deteil">{{item.description}}</p>
              <h5>{{item.author}}</h5>
              <i>发布于{{timestampToTime(item.publishDate)}}</i>
              <div v-for="(tagItem, index) in item.tags" :key="index" class="spanItem">
                <el-tag>{{tagItem}}</el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    timestampToTime(timestamp) {
      let date = new Date((Number)(timestamp));
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  computed: {
    addArticleId() {
      console.log(this._id);
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "http://localhost:3000/api/article/AllArticle",
      headers: {
        Authorization: $cookies.get("token"),
      },
    }).then((resolve) => {
      console.log(resolve);
      resolve.data.forEach(element => {
        element.faceImg.length ==0? element.faceImg ="":element.faceImg=element.faceImg[0].url
      });
      // 将数据放在本视图的data中
      this.items = resolve.data;
      // 将数据遍历放进sessionStorage
      sessionStorage.setItem('articleList',JSON.stringify(resolve.data))
    });
  },
};
</script>

<style>
.showTitleCard {
  margin-bottom: 10px;
  height: 140px;
  position: relative;
}

.showTitleCard a {
  text-decoration-line: none;
  color: black;
}
.showCardLine {
  position: absolute;
  top: 10px;
  margin-left: 30px;
  display: inline-block;
}

.showCardLine h3 {
  margin: 5px 0px;
}
.showCardLine .deteil {
  width: 750px;
  height: 45px;
  overflow: hidden;
  word-wrap: break-word;
  word-break: normal;
}
.description P {
  margin: 5px;
}
.description h5 {
  margin: 0px;
  display: inline-block;
}

.spanItem {
  display: inline;
  margin: 0 5px;
  cursor: pointer;
}
</style>
