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
import { requestAdminTagList, requestAdminTagAdd } from "~/assets/api/";
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
          requestAdminTagAdd(this.addForm).then(res => {
            if (res.state === 0) {
              this.$message({
                showClose: true,
                message: res.message,
                type: "success"
              });
            }
          });
        }
      });
    },
    async getTagList() {
      let data = await requestAdminTagList();
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
