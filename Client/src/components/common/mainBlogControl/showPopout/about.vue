<template>
  <div id="aboutItem">
    <div
      :class="!isShowAbout ? '' : 'showAbout'"
      class="aboutLink-action unSelect-text"
      @click="clickTranslateX()"
    >
      <h5 class="aboutText">About</h5>
      <div class="aboutGraph"></div>
    </div>
    <!-- 弹窗 -->
    <mask-layer-msg :isShow="isShowAbout" @changeIsShow="clickTranslateX()">
      <!-- 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确 -->
      <template #popoutTitle> About </template>
      <div>
        <header class="aboutHeader">
          您好，这是GLosZhao的博客，如果你觉得该博客有意思可以将其添加进收藏夹，该博客不仅会分享前端知识，有时也会出现不正经的知识。
        </header>
        <article class="aboutMain">
          <em>关于博客构建</em>
          <hr />
          客户端（即你现在看到的这个）<br />
          VUE.js + Vue-Router + VueX <br />
          Axios<br />
          -----------------------------------------------------<br />
          后台管理 <br />
          VUE.js + Vue-Router + VueX<br />
          Element-UI<br />
          Vue-Cookies + Axios<br />
          Express + cors + jsonwebtoken + mongoose <br />
          <hr />
        </article>
        <div></div>
      </div>
    </mask-layer-msg>
  </div>
</template>

<script>
import maskLayerMsg from "components/generalCPN/maskLayerMsg";
export default {
  name: "aboutItem",
  data() {
    return {
      isShowAbout: false,
    };
  },
  methods: {
    // 动画效果控制
    clickTranslateX() {
      this.isShowAbout = !this.isShowAbout;
    },
  },
  components: {
    maskLayerMsg,
  },
};
</script>

<style>
.aboutLink-action {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 100%;
  width: 50%;
  cursor: pointer;
  transition: transform 0.35s linear 0s;
}

.showAbout {
  transform: translateX(200%);
}

.aboutGraph {
  border-left: 70px solid lightgreen;
  border-top: 70px solid transparent;
  border-bottom: 70px solid transparent;
}

.aboutText {
  position: absolute;
  bottom: 0px;
  z-index: 2;
  color: black;
  line-height: 67px;
  font-size: 23px;
}

.aboutHeader {
  font-size: 20px;
  margin-bottom: 30px;
}
.aboutMain {
  font-size: 18px;
  margin-bottom: 30px;
}
.showAllTags {
  position: absolute;
  bottom: 180px;
  width: 90%;
  height: 40%;
  /* background-color: blue; */
  border: 1px solid #00000018;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  padding: 15px;
}
</style>