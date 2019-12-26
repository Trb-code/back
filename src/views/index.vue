<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <!-- 1------------------- -->

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2--------------------------- -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <!-- 嵌套路由跳转 index=path------- -->
              <el-menu-item index="artlist">文章列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="postlist">文章发布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 3------------------- -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 头部=-------------------------------------------- -->
      <el-container>
        <el-header style="color:#ffffff;font-size:20px">
          后台管理系统
          <button style="color:#006699" @click="tuichu">退出</button>
        </el-header>
        <!-- 主要内容------------------------------------------------------- -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    tuichu () {
      localStorage.removeItem('heima_40_back_token')
      this.$router.push({ name: 'login' })
    }
  }

}
</script>

<style lang="less" scoped>


 .index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #3399CC;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3399CC;
  }
 }
 /deep/.el-submenu__title{
   background-color: #3399CC !important;
 }
</style>
