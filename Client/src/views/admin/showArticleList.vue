<template>
  <el-container>
    <el-main>
      <h1>文章管理</h1>
      <!--文章展示-->
      <el-row>
        <el-col>
          <el-table :data="tableData" row-key="border" highlight-current-row>
            <!--文章封面-->
            <el-table-column label="文章封面" show-overflow-tooltip width="180">
              <template>
                <div class="demo-image__preview">
                  <el-image :src="tableData.faceImg" style="width: 140px; height: 60px"></el-image>
                </div>
              </template>
            </el-table-column>
            <!--文章标题-->
            <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip></el-table-column>
            <!--文章标签-->
            <el-table-column prop="tags" label="标签" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="tagsCol">
                  <div v-for="item in scope.row.tags" :key="item.id">
                    <el-tag size="mini">{{item}}</el-tag>
                  </div>
                </div>
              </template>
            </el-table-column>
            <!--文章添加时间-->
            <el-table-column
              prop="publishDate"
              :formatter="forma2Date"
              label="发布时间"
              header-align="center"
              width="200"
            ></el-table-column>
            <!--文章更新时间-->
            <el-table-column prop="modifyDate" label="修改时间" header-align="center" width="200"></el-table-column>
            <!--操作-->
            <el-table-column align="center" fixed="right" width="250">
              <template slot="header" slot-scope>
                <el-input v-model="search" size="small" placeholder="输入关键字搜索" clearable />
              </template>
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.row._id)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!--分页-->
      <el-row>
        <el-col>
          <div class="block">
            <el-pagination
              center
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="8"
              layout="total, prev, pager, next"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// 导入时间戳转换日期时间的js
export default {
  name: "showArticleList",
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {
    // 编辑文章按钮
    handleEdit(Article_id) {
      this.$router.push({
        path: "/adminView/editArticle",
        query: {
          Article_id: Article_id,
        },
      });
      console.log(Article_id);
    },
    // 删除文章按钮
    handleDelete(articleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确认删除后向后端发起请求删除该数据
          console.log(articleId);
          this.$axios
            .delete("http://localhost:3000/api/article", {
              params: {
                articleId: articleId,
              },
              headers: {
                Authorization: $cookies.get("token"),
              },
            })
            .then((resolve) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$router.go(this.$route)
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 模糊搜索文章
    SearchArtcle(value) {
      console.log(value);
    },
    // 批量删除
    DeleteArtcle() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    forma2Date(row, column) {
      return new Date(Number(row[column.property])).toLocaleString();
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
      this.tableData = resolve.data;
    });
  },
};
</script>

<style scoped>
.tagsCol {
  display: flex;
  flex-direction: row;
}
.tagsCol div {
  padding: 0 3px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
