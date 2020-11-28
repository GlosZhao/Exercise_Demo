<template>
  <!-- 遮罩层 -->
  <transition name="popupAction">
    <!-- 这里要注意设置阻止捕获事件，否则影响子元素 -->
    <div v-if="isShow" class="maskLayer" @click.self="changeIsShowBySon()">
      <!-- 信息层 -->
      <div class="ShowMainMsg">
        <div class="ContentBorder">
          <h1 class="">
            <slot name="popoutTitle"></slot>
          </h1>
          <main class="mainContent">
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "maskLayerMsg",
  props: {
    isShow: {
      type: Boolean,
      required: true, // 必填数据
      default: false,
    },
  },
  methods: {
    changeIsShowBySon() {
      this.$emit("changeIsShow");
    },
  },
};
</script>

<style>
.maskLayer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
.ShowMainMsg {
  height: 100vh;
  width: calc(100vw - 210px);
  background-color: white;
  float: right;
  border-radius: 3px;
  position: relative;
}
.ContentBorder{
  margin: 30px;
}
.mainContent{
  margin: 20px;
}

.popupAction-enter-active,
.popupAction-leave-active {
  transition: opacity 0.3s linear 0s;
}
.popupAction-enter,
.popupAction-leave-to {
  opacity: 0;
}
.popupAction-enter-to,
.popupAction-leave {
  opacity: 1;
}
</style>