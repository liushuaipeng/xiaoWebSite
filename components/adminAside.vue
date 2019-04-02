<template>
  <div class="adminAside">
    <el-menu :default-active="menuActiveName"
      class="el-icon-document">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="admin-tag"
          @click="$router.push({ name: 'admin-tag' })">
          <i class="el-icon-star-off"></i>
          <span slot="title">标签管理</span>
        </el-menu-item>
        <el-menu-item index="admin-article"
          @click="$router.push({ name: 'admin-article' })">
          <i class="el-icon-tickets"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- <div class="aside_button"
      @click="sidebarFold = !sidebarFold">
      <el-button>
        <i :class="sidebarFold?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActiveName: ""
    };
  },
  mounted() {
    console.log(this.$route.name);
    this.menuActiveName = this.$route.name;
  }
};
</script>

<style lang="less" scoped>
.adminAside {
  height: 100%;
  width: 230px;
  overflow: auto;
  .el-menu {
    width: 200px;
  }
  .aside_button {
    position: fixed;
    bottom: 30px;
    left: 78px;
    .el-button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      vertical-align: middle;
      padding: 0;
      font-size: 20px;
    }
  }
}
</style>
