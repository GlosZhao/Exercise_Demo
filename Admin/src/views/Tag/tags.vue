<template>
  <div class="tagArea">
    <!-- 进阶需求：点击标签会转化为Input，失去焦点后触发修改事件 -->
    <el-tag
      :key="item._id"
      v-for="item in TagList"
      closable
      :disable-transitions="false"
      @close="handleClose(item._id)"
    >
      {{ item.tagName }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
import { tags } from "network/api";
export default {
  name: "tags",
  data() {
    return {
      TagList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  computed: {},
  methods: {
    handleClose(tagId) {
      tags
        .tagDelete(tagId)
        .then((res) => {
          if (res.successJudge) {
            this.TagList.splice(
              this.TagList.findIndex((e) => e._id === tagId),
              1
            );
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "错误",
            message: "刪除失败",
          });
        });
    },
    showInput() {
      this.inputVisible = true;

      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        tags
          .tagCreate({ tagName: inputValue })
          .then((res) => {
            this.TagList.push(res);
            this.inputVisible = false;
            this.inputValue = "";
          })
          .catch((err) => {
            this.$notify.error({
              title: "错误",
              message: err,
            });
            this.inputValue = "";
          });
      } else {
        this.inputValue = "";
        this.inputVisible = false;
      }
    },
  },
  mounted() {
    tags
      .tagShow()
      .then((res) => {
        res.forEach((e) => {
          this.TagList.push(e);
        });
      })
      .catch((err) => {
        this.$notify.error({
          title: "错误",
          message: "服务器出错",
        });
      });
  },
};
</script>

<style>
.tagArea {
  padding: 20px 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>