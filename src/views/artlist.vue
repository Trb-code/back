<template>
  <div class="list">
    <!-- 面包屑导航------------- -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>文章管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- ------------------------------------- -->
    <!-- 表格------------------------------------------------ -->
    <!-- :data 绑定某个数据 -->
    <el-table :data="postlist" style="width: 100%;margin-top:20px" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <!-- 日期---------------------- -->
      <el-table-column prop="create_date" label="日期" width="180">
        <template slot-scope="scope">{{scope.row.create_date|datafromat}}</template>
      </el-table-column>
      <!-- ------------ -->
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <!-- 文章类型---- -->

      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮----------------- -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
          <!-- 分享按钮---------------------- -->
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-share"></i>
            </el-button>
          </el-tooltip>

          <!-- 删除按钮------------------ -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页------------------------------ -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { arctlist } from '../api/user.js'
import { datafromat } from '../filters/filters'

export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 2,
      postlist: [],
      total: '0'

    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    // 更新数据
    async init () {
      let res = await arctlist({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize

      })
      console.log(res);
      if (res.status === 200) {
        this.postlist = res.data.data
        this.total = res.data.total
      }
    },
    // 分页
    handleSizeChange (val) {
    // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
    // console.log(`当前页: ${val}`);
      this.pageIndex = val
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  // 指令注册
  filters: {
    datafromat
  }


}


</script>

<style>

</style>
