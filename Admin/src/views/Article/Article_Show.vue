<template>
  <div class="showArticle">
    <h1>{{ title }}</h1>
    <strong class="author">{{ author }}</strong>

    <!-- 标签 -->
    <div class="spanItem">
      <div v-for="(spanItem, index) in Tags" :key="index">
        <el-tag size="mini">{{ spanItem }}</el-tag>
      </div>
    </div>
    <!-- 正文 -->
    <div v-html="html"></div>
    <div class="dateClass">
      <div>发表于{{ format(publishDate) }}</div>
      <div v-show="!isShowModifyDate">修改于{{ format(modifyDate) }}</div>
    </div>
  </div>
</template>

<script>
import { timestampToTime } from "common/methods";
import { article } from "network/api";
export default {
  name: "articleShow",
  data() {
    return {
      title: "", // 文章标题
      author: "", //作者
      description: "", //文章基本描述
      Tags: [], //已选的标签
      faceImg: [],
      publishDate: "",
      modifyDate: "",
      html: "", // markdown解析成html
    };
  },
  methods: {
    format(dataTime) {
      return timestampToTime(dataTime);
    },
  },
  computed: {
    isShowModifyDate() {
      return this.modifyDate == "";
    },
  },
  watch: {},
  mounted() {
    article
      .articleSearchByID(this.$route.query.Article_Id)
      .then((resolve) => {
        (this.title = resolve.title),
          (this.author = resolve.author),
          (this.description = resolve.description),
          (this.Tags = resolve.tags),
          (this.faceImg = resolve.faceImg),
          (this.publishDate = resolve.publishDate),
          (this.modifyDate = resolve.modifyDate),
          (this.html = resolve.html);
      })
      .catch((reject) => {});
  },
};
</script>

<style>
.showArticle {
  margin: 20px;
}
.showArticle > h2 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: 400;
  font-size: 18px;
}
.showArticle div {
  margin: 5px 0;
}
.dateClass {
  display: flex;
  flex-direction: row;
}
.dateClass div {
  margin-right: 30px;
}
.spanItem {
  display: flex;
  flex-direction: row;
}
.spanItem div {
  padding: 0 3px;
}
</style>