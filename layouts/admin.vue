<template>

  <div class="admin">
    <el-container>
      <el-header height="50px">admin</el-header>
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

  </div>
</template>
<script>
import adminAside from "../components/adminAside";
export default {
  components: {
    adminAside
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

