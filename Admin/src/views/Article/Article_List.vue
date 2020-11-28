<template>
  <el-main>
    <!-- <el-scrollbar class="tableScrollbar">  -->
    <el-table
      :data="
        tableDate.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%"
      size="medium"
    >
      <el-table-column
        fixed
        prop="title"
        label="文章标题"
        width="250"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="350"
        header-align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="120"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        width="250"
        header-align="center"
      >
        <template slot-scope="scope">
          <div class="tagsCol">
            <div v-for="item in scope.row.tags" :key="item.id">
              <el-tag size="mini">{{ item }}</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="publishDate"
        label="发布日期"
        width="100"
        :formatter="forma2Date"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="modifyDate"
        label="修改日期"
        width="100"
        :formatter="forma2Date"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120px"
        resizable
        header-align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleShow(scope.row._id)"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationClass">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableList"
        :current-page="currentPage"
        :page-size="pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- </el-scrollbar> -->
  </el-main>
</template>

<script>
import { article } from "network/api";
export default {
  data() {
    return {
      tableDate: [],
      currentPage: 1,
      pagesize: 7,
    };
  },
  computed: {
    tableList() {
      return this.tableDate.length;
    },
  },
  methods: {
    // 查看文章
    handleShow(Article_Id) {
      this.$router.push({
        name: "Show",
        query: {
          Article_Id: Article_Id,
        },
      });
    },
    // 编辑文章
    handleEdit(Article_Id) {
      console.log("id:" + Article_Id);
      this.$router.push({
        name: "Edit",
        query: {
          Article_Id: Article_Id,
        },
      });
    },
    // 删除文章
    handleDelete(articleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((confirm) => {
          // 点击确认删除后向后端发起请求删除该数据
          article.articleDel(articleId).then((resolve) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$router.go(this.$route);
          });
        })
        .catch((cancel) => {
          console.log(cancel);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 格式化时间挫
    forma2Date(row, column) {
      let cellValue = row[column.property];
      return cellValue.length == 0
        ? "暂无"
        : new Date(Number(cellValue)).toLocaleString();
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  mounted() {
    article
      .articleShow()
      .then((resolve) => {
        this.tableDate = resolve;
      })
      .catch((reject) => {});
  },
};
</script>

<style >
.tagsCol {
  display: flex;
  flex-direction: row;
}
.tagsCol div {
  padding: 0 3px;
}
.paginationClass {
  text-align: center;
  margin-top: 10px;
}
/* .el-scrollbar.tableScrollbar {
  width: 100%;
  height: 100%;
}
div.el-scrollbar__wrap {
  overflow-y: hidden;
} */
</style>