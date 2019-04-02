<template>
  <div class="adminTag">
    <el-button type="text"
      @click="dialogAddTag = true">新增标签</el-button>

    <el-dialog title="新增标签"
      :visible.sync="dialogAddTag">
      <el-form :model="addForm"
        ref="addForm"
        @submit.native.prevent>
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
import axios from "axios";
export default {
  layout: "admin",
  data() {
    return {
      dialogAddTag: false,
      addForm: {
        name: "测试"
      }
    };
  },
  methods: {
    addFormSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          axios.post("/api/admin/tag/add", this.addForm).then(res => {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: res.data.state === 0 ? "success" : "error"
            });
          });
        }
      });
    },
    async getTagList() {
      let { data } = await axios.get(
        "http://localhost:1104/api/admin/tag/list"
      );
      console.log(data);
    }
  },
  mounted() {
    this.getTagList();
  }
};
</script>

<style lang="less" scoped>
</style>
