<template>
  <div class="adminArticle">
    <div style="text-align:right;">
      <nuxt-link to="/admin/addArticle">
        <el-button type="primary">写文章</el-button>
      </nuxt-link>
    </div>
    <div class="table_wrap">
      <el-table :data="articleList"
        border
        style="width: 100%">
        <el-table-column prop="id"
          label="ID"
          min-width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="title"
          label="Title"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tags"
          label="Tags"
          show-overflow-tooltip
          min-width="150">
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.tags"
              :key="tag.id"
              type="small">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author"
          label="Author"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="describe"
          label="Describe"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="meta.createdAt"
          label="CreatedTime"
          min-width="100"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.meta.createdAt)}}
          </template>
        </el-table-column>
        <el-table-column prop="state"
          label="State"
          width="63">
          <template slot-scope="scope">
            <el-tag size="small"
              :type="scope.row.state === 1?'':'success'">{{scope.row.state === 1?'上架':'草稿'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          fixed="right"
          width="116">
          <template slot-scope="scope">
            <nuxt-link :to="'/article/detail/'+scope.row.id">
              <el-button type="info"
                icon="el-icon-view"
                size="mini"
                circle>
              </el-button>
            </nuxt-link>
            <nuxt-link :to="'/admin/addArticle?id='+scope.row.id">
              <el-button type="primary"
                icon="el-icon-edit"
                circle
                size="mini">
              </el-button>
            </nuxt-link>
            <el-button type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteArticleHandle(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  requestAdminArticleList,
  requestAdminTagAdd,
  requestAdminTagCancel,
  requestAdminArticleDelete
} from "~/assets/api/";
import { dateFormat } from "~/assets/js/common";
export default {
  layout: "admin",
  data() {
    return {
      articleList: []
    };
  },
  methods: {
    async getArticleList() {
      let { data } = await requestAdminArticleList();
      this.articleList = data.list;
    },
    dateFormat(date) {
      return dateFormat(date);
    },
    async deleteArticleHandle(id) {
      try {
        await this.$confirm(`确定删除id为【${id}】的文章么？`, "删除文章");
        let res = await requestAdminArticleDelete({ id });
        console.log(res);
        if (res.state === 0) {
          this.$message({
            message: res.message,
            type: "success",
            showClose: true
          });
          this.getArticleList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getArticleList();
  }
};
</script>

<style lang="less" scoped>
.adminArticle {
  .table_wrap {
    margin-top: 30px;
    .el-tag + .el-tag {
      margin-left: 5px;
    }
  }
}
</style>


