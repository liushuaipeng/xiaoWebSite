<template>
  <div class="addArticle">
    <el-form ref="form"
      :model="form"
      label-width="40px">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="名称">
            <el-input v-model="form.title"
              placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select v-model="form.tag"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请选择标签"
              :remote-method="remoteMethod"
              :loading="loadingTag"
              @change="tagChange"
              style="width:100%;">
              <el-option v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述">
            <el-input v-model="form.describe"
              placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <no-ssr>
            <mavon-editor v-model="form.content"
              class="mavon_editor"></mavon-editor>
          </no-ssr>
        </el-col>
        <el-col :span="24">
          <div class="submit_wrap">
            <el-button type="success"
              @click="submit(0)">草稿</el-button>
            <el-button type="primary"
              @click="submit(1)">发表</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "admin",
  data() {
    return {
      loadingTag: false,
      tagList: [],
      form: {
        state: 0,
        title: "测试文章",
        tags: [],
        describe: "测试文章的测试描述",
        content: "#### how to use mavonEditor in nuxt.js\n### 测试换行"
      }
    };
  },
  methods: {
    // 异步搜索标签
    async remoteMethod(keyword) {
      this.loadingTag = true;
      let data = await axios.get("/api/admin/tag/list", {
        params: { keyword }
      });
      this.tagList = data.data.data.list;
      this.loadingTag = false;
      return this.tagList;
    },
    // 提交
    async submit(state) {
      this.form.state = state;
      let params = Object.assign({}, this.form);
      delete params.tag;
      let data = await axios.post("/api/admin/article/add", params);
    },
    // tag变化时处理tags的数据格式
    tagChange(ids) {
      this.form.tags = [];
      let _self = this;
      ids.forEach(id => {
        this.initTagList.forEach(tag => {
          if (id === tag.id) {
            this.form.tags.push({
              id: tag.id,
              name: tag.name
            });
          }
        });
      });
    }
  },
  async mounted() {
    let list = await this.remoteMethod();
    this.initTagList = Object.assign([], list);
  }
};
</script>

<style lang="less" scoped>
.addArticle {
  .submit_wrap {
    margin-top: 50px;
    text-align: center;
    .el-button + .el-button {
      margin-left: 50px;
    }
  }
}
.mavon_editor {
  height: 500px;
}
</style>

