<template>
  <div class="adminLogin">
    <el-card shadow="always">
      <el-form ref="form"
        :model="form"
        label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"
            v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
            @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "shuaipengliu@foxmail.com",
        password: "LIU.0410"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("-");
      axios.post("/api/admin/login", this.form).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.adminLogin {
  padding: 30px;
}
</style>
