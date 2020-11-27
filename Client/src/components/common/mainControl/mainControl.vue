<template>
  <div>
    <div class="topContent">
      <div class="topDrawer">
        <!-- 隐藏的面板 -->
        <div class="mainTopBoard">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#909399"
            text-color="#fff"
            :router="true"
            active-text-color="#8CC5FF"
          >
            <el-menu-item index="1" route="/">Home主页</el-menu-item>
            <!-- 需求更改:当消息中心有消息时会字体会变红色 -->
            <el-menu-item index="2" route="/commentControl">消息中心</el-menu-item>
            <el-menu-item
              index="3"
              route="/adminView"
              v-if="getJudgeAdmin"
              @click="changeViewshape()"
            >Menagement</el-menu-item>
          </el-menu>
        </div>
        <!-- 外部暴露标签 -->
        <div class="indexTag">
          <div class="downwardArrows"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1" ,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 改变管理界面
    changeViewshape() {
      this.$store.commit("changeView",true);
    },
  },
  watch: {
    // 改变取vuex中的权限
  },
  computed: {
    // 取vuex中的权限
    // vuex概念问题
    getJudgeAdmin() {
      this.$store.dispatch("actChangeIsAdmin", this.$cookies.isKey("isAdmin"));
      return this.$store.state.isAdmin;
    },
  },
  watch:{
    // 监听路由变化
      $route(to,from){
        if(from.path=="/adminView"){
         this.$store.commit("changeView",false)
        }
      }
  }
};
</script>

<style>
.topContent {
  position: fixed;
  left: calc(50% - 300px);
  top: 0px;
  width: 600px;
  height: 60px;
  overflow: hidden;
  z-index: 2;
}
.topDrawer {
  position: absolute;
  top: -61px;
  width: 600px;
  height: 120px;
  transition: transform 0.5s linear 0s;
}
.topDrawer:hover {
  transform: translateY(60px);
}

.mainTopBoard {
  width: 600px;
  height: 60px;
}
.mainTopBoard > ul {
  padding: 0px 10px;
}

.mainTopBoard li {
  font-size: 20px;
}
.indexTag {
  width: 600px;
  height: 60px;
}

.indexTag > .downwardArrows {
  width: 100px;
  height: 100px;
  position: absolute;
  left: calc(50% - 50px);
  top: 26px;
  transform: rotateZ(-45deg) skew(30deg, 30deg);
  border-bottom: 10px solid grey;
  border-left: 10px solid grey;
  cursor: pointer;
}
</style>