<template>
  <el-container>
    <el-col :span="24">
      <el-main>
        <h1>修改文章</h1>
        <el-row>
          <el-col :span="12">
            <el-input v-model="title" placeholder="请输入文章标题" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="3">
            <el-input v-model="author" placeholder="请输入作者名称" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-select
              v-model="selectedTags"
              placeholder="请选择文章标签"
              size="medium"
              filterable
              allow-create
              multiple
              style="width: 100%"
            >
              <el-option
                v-for="item in selectableTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-input
              type="textarea"
              rows="4"
              v-model="description"
              placeholder="请输入文章描述"
              clearable
              show-word-limit
              :maxlength="100"
            ></el-input>
          </el-col>

          <el-col :span="8" :offset="2">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:3000/uploadImg"
              :headers="uploadHeader"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadImgSuccess"
              :on-error="uploadImgError"
              :file-list="faceImg"
              :limit="1"
              :auto-upload="false"
              list-type="picture"
            >
              <el-button slot="trigger" size="small" type="primary">选取封面图片</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="3">
          <el-col>
            <div id="editor">
              <mavon-editor
                style="height: 100%"
                v-model="md"
                ref="md"
                @imgAdd="imgAdd"
                @change="change"
              ></mavon-editor>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="3">
          <el-col>
            <el-button type="success" @click="PublishButton">文章发布</el-button>
            <el-button type="primary" @click="PublishSave">保存草稿</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-col>
  </el-container>
</template>

<script>
// Local Registration
import axios from "axios";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "insertArticle",
  data() {
    return {
      uploadHeader: {
        Authorization: $cookies.get("token"),
      },
      title: "", // 文章标题
      author: "", //作者
      description: "", //文章基本描述
      selectableTags: [
        // 可选的文章标签
      ],
      selectedTags: [], //已选的标签
      faceImg: [],
      md: "", // 文章内容
      html: "", // markdown解析成html
    };
  },
  methods: {
    // 发布文章
    PublishButton() {
      if (this.md && this.title) {
        // 获取文章之后的处理逻辑
        this.$axios
          .put("http://localhost:3000/api/article", this.jsonSetData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: $cookies.get("token"),
            },
          })
          .then((response) => {
            console.log(response);
            if (response.data.isPublish) {
              this.dataSetNull();
              this.$notify({
                title: "成功",
                message: "文章发布成功",
                type: "success",
              });
            } else {
              this.$notify({
                title: "faile",
                message: "文章发布失败",
                type: "error",
              });
            }
          })
          .catch((error) => {
            this.$notify({
              title: "错误",
              message: "服务器发生未知错误",
              type: "error",
            });
          });
      } else {
        this.$notify({
          title: "警告",
          message: "标题和内容必须填写",
          type: "warning",
        });
      }
    },
    // 保存文章
    PublishSave() {
      if (this.md && this.title) {
        // 获取文章之后的处理逻辑
        this.$axios
          .post(
            "http://localhost:3000/api/CasualArticle",
            // 构造请求参数form-data
            this.jsonSetData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: $cookies.get("token"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data.ok == 1 && response.data.nModified == 1) {
              this.$notify({
                title: "成功",
                message: "保存草稿成功",
                type: "success",
              });
            } else if (response.data.nModified == 0) {
              this.$notify({
                title: "成功",
                message: "没有任何改动",
                type: "success",
              });
            }
          })
          .catch((error) => {
            this.$notify({
              title: "错误",
              message: "服务器发生未知错误",
              type: "error",
            });
          });
      } else {
        this.$notify({
          title: "警告",
          message: "标题和内容必须填写",
          type: "warning",
        });
      }
    },
    // 删除封面图触发的函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);

      this.faceImg = [];
      console.log(this.faceImg);
    },
    // 点击封面图触发的函数
    handlePreview(file) {
      // console.log(file);
    },
    // 上传封面图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传成功的钩子
    uploadImgSuccess(response, file, fileList) {
      this.faceImg.push({
        name: response.imgName,
        url: response.imgPath,
      });
      this.$notify({
        title: "成功",
        message: "上传封面图片成功",
        type: "success",
      });
    },
    //上传失败的钩子
    uploadImgError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: err,
      });
    },
    // 绑定@imgAdd event
    imgAdd(pos, $file) {
      let md = this.$refs.md;
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("upload", $file);
      this.$axios({
        url: "http://localhost:3000/uploadMDImg",
        method: "post",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: $cookies.get("token"),
        },
      })
        .then((reslove) => {
          // 将后端返回的url替换到文本原位置
          md.$img2Url(pos, reslove.data.imgPath);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    dataSetNull() {
      this.title = "";
      this.description = "";
      this.author = "";
      this.faceImg = "";
      this.selectedTags = "";
      this.html = "";
      this.md = "";
    },
  },
  computed: {
    // 将值赋值过去
    jsonSetData() {
      return JSON.stringify({
        _id: this.$route.query.Article_id,
        title: this.title,
        description: this.description,
        author: this.author,
        faceImg: this.faceImg,
        tags: this.selectedTags,
        html: this.html,
        md: this.md,
      });
    },
  },
  comments: mavonEditor,
  // 钩子 组件加载后运行 查询所有分类
  created: function () {
    // 组件创建之后,渲染之前
    // 在created这个方法中可以操作后端的数据  数据驱动试图
    // 应用：发起Ajax请求=
    this.$axios
      .get("http://localhost:3000/api/tag/AllTag", {
        headers: {
          Authorization: $cookies.get("token"),
        },
      })
      .then((res) => {
        // 校验后端返回的code
        res.data.forEach((key) => {
          this.selectableTags.push({ value: key.tagName, label: key.tagName });
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    //  获取存储的临时数据在Vdom加载完后，还没有渲染前
    this.$axios({
      method: "GET",
      url: "http://localhost:3000/api/article",
      params: {
        articleId: this.$route.query.Article_id,
      },
      headers: {
        Authorization: $cookies.get("token"),
      },
    })
      .then((response) => {
        if (response.data != null) {
          (this.title = response.data.title), // 文章标题
            (this.author = response.data.author), //作者
            (this.description = response.data.description), //文章基本描述
            (this.selectedTags = response.data.tags), //已选的标签
            (this.faceImg = response.data.faceImg), //封面图片,
            (this.md = response.data.md), // 文章内容
            (this.html = response.data.content); // markdown解析成html
        }
      })
      .catch();
  },
};
</script>

<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 700px;
}

.el-row {
  margin-bottom: 20px;
}
</style>
