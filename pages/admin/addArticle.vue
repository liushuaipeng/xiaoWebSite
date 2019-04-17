<template>
  <div class="addArticle">
    <el-form ref="form"
      :model="form"
      label-width="40px">
      <el-row :gutter="80">
        <el-col :span="15">
          <el-form-item label="名称">
            <el-input v-model="form.title"
              placeholder="请输入标题"></el-input>
          </el-form-item>
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
          <el-form-item label="描述">
            <el-input v-model="form.describe"
              placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="封面">
            <el-upload class="cover-uploader"
              name="files"
              :action="domin+'/api/admin/upload'"
              :show-file-list="false"
              :on-success="handleCoverSuccess"
              :before-upload="beforeCoverUpload">
              <img v-if="form.cover"
                :src="form.cover"
                class="cover">
              <i v-else
                class="el-icon-plus cover-uploader-icon"></i>
            </el-upload>

          </el-form-item>
        </el-col>
        <el-col :span="24">
          <no-ssr>
            <mavon-editor v-model="form.content"
              class="mavon_editor"
              @imgAdd="imgUploadME"
              ref="md"
              @change="contentChange"></mavon-editor>
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
import {
  domin,
  requestAdminTagList,
  requestAdminArticleAdd,
  requestAdminArticleByids
} from "~/assets/api/";
export default {
  layout: "admin",
  data() {
    return {
      domin,
      loadingTag: false,
      tagList: [],

      form: {
        state: 0,
        title: "",
        tags: [],
        describe: "",
        content: "",
        cover: "",
        contentHtml: ""
      }
    };
  },
  methods: {
    // 加载文章内容
    async getArticleDetail(id) {
      let { data } = await requestAdminArticleByids({ id });
      console.log(data);
      data.tag = [];
      data.tags.forEach(tag => {
        data.tag.push(tag.id);
      });
      this.form = data;
    },
    // 异步搜索标签
    async remoteMethod(keyword) {
      this.loadingTag = true;
      let res = await requestAdminTagList({ keyword });
      if (res.state === 0) {
        this.tagList = res.data.list;
        this.loadingTag = false;
      }
      return this.tagList;
    },
    // 提交
    async submit(state) {
      this.form.state = state;
      let params = Object.assign({}, this.form);
      delete params.tag;
      let res = await requestAdminArticleAdd(params);
      if (res.state === 0) {
        this.$message({
          message: res.message,
          type: "success",
          showClose: true
        });
      }
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
    },
    contentChange(content, contentHtml) {
      this.form.contentHtml = contentHtml;
    },
    handleCoverSuccess(res) {
      this.form.cover = res.data.list[0].url;
    },
    beforeCoverUpload() {},
    async imgUploadME(pos, $file) {
      var formdata = new FormData();
      formdata.append("files", $file);
      let res = await axios({
        url: "/api/admin/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      });
      let url = res.data.data.list[0].url;
      this.$refs.md.$img2Url(pos, url);
    }
  },
  async mounted() {
    let list = await this.remoteMethod();
    this.initTagList = Object.assign([], list);
    if (this.$route.query.id) {
      this.getArticleDetail(this.$route.query.id);
    }
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
<style lang="less">
.addArticle {
  .cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .cover {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>


