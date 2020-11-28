<template>
  <div id="registeItem">
    <div
      :class="!isShowSearch ? '' : 'showSearch'"
      class="searchLink-action unSelect-text"
      @click="clickRotateZ()"
    >
      <h5 class="searchText">search</h5>
      <div class="searchGraph"></div>
    </div>
    <mask-layer-msg :isShow="isShowSearch" @changeIsShow="clickRotateZ()">
      <!-- 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确 -->
      <template #popoutTitle> search </template>
      <div class="searchMainBorder">
        <!-- 搜索框（搜索结果展示框） -->
        <!-- @commit="getTheSearchResult"这里传参别写括号 -->
        <search-box
          ref="searchBox"
          @commit="getResultOfSearch"
          :inputData.sync="searchOBJ"
          :queryResult="searchResultList"
        ></search-box>
        <!-- 标签展示框 -->
        <tag :tagsList="Tags" @tagsValueToSearch="getTagValue"></tag>
      </div>
    </mask-layer-msg>
  </div>
</template>

<script>
import maskLayerMsg from "components/generalCPN/maskLayerMsg";
import searchBox from "components/generalCPN/searchBox";
import tag from "components/generalCPN/tag";
import { getAllTags, searchByKeyWords } from "network/api";
export default {
  name: "aboutItem",
  data() {
    return {
      isShowSearch: false,
      Tags: [],
      searchOBJ: { searchData: "" },
      // searchData: "",
      searchResultList: [
        // {
        //   title: "2020年，我是如何从一名Vueer转岗到React阵营（区分分析与经验分享）",
        //   description: "Vue和React是国内前端生态大型项目用的比较多的框架",
        // },
        // {
        //   title: "Next.js+Egg.js+React项目服务器部署超详解",
        //   description: "这是一个基于React开发的博客项目，前端工程所用技术栈为Next.js+React Hooks+Antd+Axios,后台服务所用技术栈为Egg.js",
        // },
        // {
        //   title: "一道体现JavaScript综合能力的基础面试题，居然没有一个完全答对",
        //   description: "年前刚刚离职了，分享下我曾经出过的一道面试题，此题是我出的一套前端面试题中的最后一题，用来考核面试者的JavaScript",
        // },
        // {
        //   title: "前端高频面试题整理 前端两年",
        //   description: "无论是刚入门的前端新手还是工作了几年的中高级前端 前端基础都是必须要牢牢掌握的 是不是有时候感觉到一个问题自己能回答",
        // },
      ],
    };
  },
  methods: {
    clickRotateZ() {
      this.isShowSearch = !this.isShowSearch;
    },
    // e为子组件传过来的值
    // 点击tag
    getTagValue(e) {
      this.searchOBJ.searchData = e;
    },
    // 输入input
    getResultOfSearch(e) {
      if (e.length != 0) {
        this.searchResultList = [];
        searchByKeyWords(e)
          .then((res) => {
            res.resultArr.forEach((e) => {
              this.searchResultList.push({
                title: e.title,
                description: e.description,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        this.searchOBJ.searchData = e;
      }else{
         this.searchResultList = [];
      }
    },
  },
  components: {
    maskLayerMsg,
    searchBox,
    tag,
  },
  mounted() {
    getAllTags()
      .then((res) => {
        res.forEach((e) => {
          this.Tags.push(e.tagName);
        });
      })
      .catch((err) => {});
  },
  watch: {
    listenInput() {
      this.searchOBJ.searchData;
      if (this.searchOBJ.searchData.length == 0) {
        console.log(123456);
      }
    },
  },
};
</script>

<style>
.searchLink-action {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 50%;
  width: 100%;
  cursor: pointer;
  transition: transform 0.35s linear 0s;
  transform-origin: right bottom;
}
.showSearch {
  transform: rotate(90deg);
}

.searchGraph {
  border-bottom: 70px solid lightseagreen;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
}

.searchText {
  position: absolute;
  bottom: 0px;
  left: 20%;
  z-index: 2;
  color: black;
  margin: 0;
  font-weight: 500;
  line-height: 40px;
  font-size: 28px;
}
.searchMainBorder {
  display: flex;
  justify-content: center;
}
</style>