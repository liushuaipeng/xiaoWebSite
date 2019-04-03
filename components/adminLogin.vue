<template>
  <div>
    <el-dialog title="登录"
      :visible.sync="loginDialogShow">
      <el-form :model="form"
        ref="form"
        label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"
            v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="loginDialogShow = false">取 消</el-button>
        <el-button type="primary"
          @click="formSubmit">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAdminLogin } from "~/assets/api";
export default {
  data() {
    return {
      form: {
        username: "shuaipengliu@foxmail.com",
        password: "LIU.0410"
      }
    };
  },
  computed: {
    loginDialogShow: {
      get() {
        return this.$store.state.loginDialogShow;
      },
      set(val) {
        this.$store.commit("updateloginDialogShow", val);
      }
    }
  },
  methods: {
    async formSubmit() {
      let res = await requestAdminLogin(this.form);
      console.log(res);
      if (res.state === 0) {
        this.$message({
          message: res.message,
          type: "success",
          showClose: true
        });
        this.loginDialogShow = false;
      }
    }
  }
};
</script>
