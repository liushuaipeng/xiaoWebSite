<template>
  <div class="admin"
    v-if="triggerReload">
    <el-container>
      <el-header height="50px">
        <div style="font-size:16px;">admin</div>
      </el-header>
      <el-container class="admin_content">
        <el-aside width="200px">
          <admin-aside></admin-aside>
        </el-aside>
        <el-main>
          <div class="admin_content_padding">
            <el-card>
              <nuxt />
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <admin-login></admin-login>
  </div>
</template>
<script>
import adminAside from "../components/adminAside";
import adminLogin from "../components/adminLogin";
export default {
  components: {
    adminAside,
    adminLogin
  },
  data() {
    return {
      triggerReload: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.triggerReload = false;
      this.$nextTick(() => {
        this.triggerReload = true;
      });
    }
  },
  mounted() {
    document.documentElement.style.fontSize = "16px";
  }
};
</script>

<style lang="less" scoped>
.admin {
  .el-main {
    padding: 0;
    background-color: #f3f6f9;
    color: #333;
  }
  .admin_content {
    height: calc(~"100vh - 50px");
  }
  .el-header,
  .el-footer {
    background-color: #268af0;
    padding: 0;
  }
  .el-aside {
    overflow: hidden;
  }
  .admin_content_padding {
    padding: 15px;
  }
}
</style>

