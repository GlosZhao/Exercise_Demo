<template>
  <div>
    <h2>{{title}}</h2>
    <strong class="author">{{author}}</strong>
    <i>发表于{{timestampToTime(publishDate)}}</i>
    <!-- 标签 -->
    <div v-for="(spanItem, index) in Tags" :key="index" class="spanItem">
      <el-tag>{{spanItem}}</el-tag>
    </div>
    <!-- 正文 -->
    <div v-html="html"></div>
    <!-- 评论 -->
    <el-divider>
      <i class="el-icon-chat-line-square"></i>
    </el-divider>
    <!-- <div v-for="item in discussList" :key="item.id">
    <discuss />-->
    <!-- </div> -->
  </div>
</template>

<script>
import discuss from "../components/article/discuss";

export default {
  data() {
    return {
      discussList: [1, 2, 3, 4, 5],
      title: "", // 文章标题
      author: "", //作者
      description: "", //文章基本描述
      Tags: "",
      faceImg: [],
      publishDate: "",
      html: "", // markdown解析成html
    };
  },
  components: {
    discuss,
  },
  methods: {
    timestampToTime(timestamp) {
      let date = new Date(Number(timestamp));
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
  mounted() {
    console.log(this.$route.query._id);
    this.$axios({
      method: "GET",
      url: "http://localhost:3000/api/article",
      params: {
        articleId: this.$route.query._id,
      },
      headers: {
        Authorization: $cookies.get("token"),
      },
    })
      .then((response) => {
        if (response.data != null) {
          console.log(response.data);
          (this.title = response.data.title), // 文章标题
            (this.author = response.data.author), //作者
            (this.description = response.data.description), //文章基本描述
            (this.Tags = response.data.tags), //已选的标签
            (this.faceImg = response.data.faceImg), //封面图片,
            (this.publishDate = Number.parseInt(response.data.publishDate)),
            (this.html = response.data.content); //解析成html
        }
      })
      .catch();
  },
};
</script>


<style>
.author {
  padding: 0px 10px;
}
</style>
