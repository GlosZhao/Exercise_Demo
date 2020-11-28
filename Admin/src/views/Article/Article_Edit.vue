<template>
  <el-container class="editorCreateClass">
    <el-col :span="24">
      <h1>发布文章</h1>
      <el-row>
        <el-col :span="12">
          <el-input
            v-model="title"
            placeholder="请输入文章标题"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-input
            v-model="author"
            placeholder="请输入作者名称"
            clearable
          ></el-input>
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
            ref="upload"
            :action="faceImgPath"
            :headers="uploadHeader"
            :on-remove="handleRemove"
            :on-success="uploadImgSuccess"
            :on-error="uploadImgError"
            :file-list="faceImg"
            :limit="1"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取封面图片</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="3">
        <el-col>
          <div id="editor">
            <mavon-editor
              style="height: 100%"
              v-model="md"
              ref="mdx"
              @imgAdd="imgAdd"
              @change="change"
            ></mavon-editor>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="3">
        <el-col>
          <el-button type="success" @click="confirmEdit">确认修改</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
// Local Registration
import { tags, article, staticResource } from "network/api";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "articleCreate",
  data() {
    return {
      uploadHeader: {
        Authorization: this.$cookies.get("token"),
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
    // 修改文章
    confirmEdit() {
      if (this.md && this.title) {
        // 获取文章之后的处理逻辑
        article
          .articleModify(this.jsonSetData)
          .then((res) => {
            this.$notify({
              title: "成功",
              message: res.successMsg,
              type: "success",
            });
          })
          .catch((err) => {
            this.$notify({
              title: "错误",
              message: err.errorMsg,
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
    handleRemove(file) {
      staticResource
        .delFaceIMG(file.url)
        .then((res) => {
          this.faceImg = [];
          this.$notify.success({
            title: "成功",
            message: res.successMsg,
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "错误",
            message: err.errorMsg,
          });
        });
    },
    // 点击封面图触发的函数
    handlePreview(file) {},
    // 上传封面图片
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传成功的钩子
    uploadImgSuccess(res, file, fileList) {
      this.faceImg.push({
        name: res.imgName,
        url: res.imgPath,
      });
      console.log(this.faceImg);
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
    //md图片上传
    imgAdd(pos, $file) {
      let md = this.$refs.mdx;
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("upload", $file);
      staticResource
        .articlePicture(formdata)
        .then((res) => {
          md.$img2Url(pos, res.imgPath);
        })
        .catch((err) => {
          this.$message.error(err);
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
      this.faceImg = [];
      this.selectedTags = "";
      this.html = "";
      this.md = "";
    },
  },
  computed: {
    // 将值赋值过去
    jsonSetData() {
      return JSON.stringify({
        Data: {
          title: this.title,
          description: this.description,
          author: this.author,
          faceImg: this.faceImg,
          tags: this.selectedTags,
          html: this.html,
          md: this.md,
        },
        _id: this.$route.query.Article_id,
      });
    },
    //获取封面图片上传路径
    faceImgPath() {
      return String(staticResource.facePicture());
    },
  },
  comments: mavonEditor,
  // 钩子 组件加载后运行 查询所有分类
  created: function () {
    // 组件创建之后,渲染之前
    // 在created这个方法中可以操作后端的数据  数据驱动试图
    // 应用：发起Ajax请求
    tags
      .tagShow()
      .then((res) => {
        res.forEach((key) => {
          this.selectableTags.push({ value: key.tagName, label: key.tagName });
        });
      })
      .catch((err) => {
        this.$message({
          showClose: true,
          message: err,
          type: "warning",
        });
      });
  },
  mounted() {
    //  获取存储的临时数据在Vdom加载完后，还没有渲染前
    article
      .articleSearchByID(this.$route.query.Article_Id)
      .then((res) => {
        if (res != null) {
          (this.title = res.title), // 文章标题
            (this.author = res.author), //作者
            (this.description = res.description), //文章基本描述
            (this.selectedTags = res.tags), //已选的标签
            (this.faceImg = res.faceImg), //封面图片,
            (this.md = res.md), // 文章内容
            (this.html = res.html); // markdown解析成html
        }
      })
      .catch((err) => {
        this.$message({
          showClose: true,
          message: err,
          type: "warning",
        });
      });
  },
};
</script>

<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 700px;
}
.el-container.editorCreateClass {
  margin: 20px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
