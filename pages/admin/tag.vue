<template>
  <div class="adminTag">
    <div style="text-align:right;">
      <el-button style=""
        type="primary"
        @click="dialogAddTag = true">新增标签
      </el-button>
    </div>
    <div class="collapse_wrap">
      <el-collapse accordion
        @change="collapseChange"
        v-model="activeName">
        <el-collapse-item v-for="tag in tagList"
          :key="tag.id"
          :name="tag.id">
          <template slot="title">
            <div class="collapse_title">
              <el-row>
                <el-col :span="12">
                  名称：<span style="color: #1abc9c;font-weight: bold;">{{tag.name}}</span>
                </el-col>
                <el-col :span="12">
                  关联文章数：<span style="color: #1abc9c;font-weight: bold;">{{tag.articles.length}}</span>
                </el-col>
              </el-row>
            </div>
          </template>
          <div class="collapse_body"
            v-loading="loading">
            <el-table :data="tag.articlesDeail"
              border
              style="width: 100%">
              <el-table-column prop="id"
                label="ID">
              </el-table-column>
              <el-table-column prop="title"
                label="Title">
              </el-table-column>
              <el-table-column prop="author"
                label="Author">
              </el-table-column>
              <el-table-column prop="state"
                label="State">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.state === 1?'':'success'">{{scope.row.state === 1?'上架':'草稿'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary"
                    size="small"
                    @click="cancelContact(scope.row, tag, scope.$index)">取消关联</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog title="新增标签"
      :visible.sync="dialogAddTag">
      <el-form :model="addForm"
        ref="addForm"
        @submit.native.prevent="addFormSubmit">
        <el-form-item label="标签名称"
          :label-width="'120px'"
          prop="name"
          :rules="[{ required: true, message: '请输入标签名称 ', trigger: 'blur' }]">
          <el-input v-model="addForm.name"
            style="width:400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogAddTag = false">取 消</el-button>
        <el-button type="primary"
          @click="addFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestAdminTagList,
  requestAdminArticleByids,
  requestAdminTagAdd,
  requestAdminTagCancel
} from "~/assets/api/";
export default {
  layout: "admin",
  data() {
    return {
      dialogAddTag: false,
      addForm: {
        name: ""
      },
      tagList: [],
      loading: false,
      activeName: ""
    };
  },
  methods: {
    addFormSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          requestAdminTagAdd(this.addForm).then(res => {
            if (res.state === 0) {
              this.$message({
                showClose: true,
                message: res.message,
                type: "success"
              });
              this.dialogAddTag = false;
              this.addForm.name = "";
              this.getTagList();
            }
          });
        }
      });
    },
    async getTagList() {
      let { data } = await requestAdminTagList();
      data.list.forEach(item => {
        item.articlesDeail = [];
      });
      this.tagList = data.list;
    },
    async collapseChange(activeName) {
      if (!activeName) {
        return;
      }
      let tag;
      this.tagList.forEach((item, i) => {
        if (item.id === activeName) {
          tag = item;
        }
      });
      this.loading = true;
      setTimeout(async () => {
        let { data } = await requestAdminArticleByids({ ids: tag.articles });
        tag.articlesDeail = data.list;
        this.loading = false;
      }, 300);
    },
    async cancelContact(article, tag, index) {
      try {
        await this.$confirm(
          `确定取消文章【${article.title}】与标签【${tag.name}】的关联么？`,
          "取消关联"
        );
        let res = await requestAdminTagCancel({
          articleid: article.id,
          tagid: tag.id
        });
        if (res.state === 0) {
          this.$message({
            message: res.message,
            type: "success",
            showClose: true
          });
          tag.articles.splice(index, 1);
          await this.collapseChange(tag.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getTagList();
  }
};
</script>

<style lang="less" scoped>
.adminTag {
  .collapse_wrap {
    margin-top: 20px;
    .el-collapse {
      border: 1px solid #ebeef5;
      .collapse_title {
        width: 100%;
        padding: 0 30px;
      }
      .collapse_body {
        padding: 25px 30px 0;
        .collapse_body_title {
          color: #1a2a3a;
        }
      }
    }
  }
}
</style>
<style lang="less">
.adminTag {
  .el-collapse-item__header {
    background-color: #f9fcfc;
    border-color: #e8f3f7;
  }
  .el-collapse-item__content {
    min-height: 120px;
  }
}
</style>
