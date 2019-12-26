<template>
  <div>
    <!-- 面包屑导航------------- -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <span>文章管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容部分 ------------------------------------>
    <!-- 卡片视图 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- 标题 -------------------------------------------->
      <el-form ref="form" :model="postfrom" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="postfrom.title"></el-input>
        </el-form-item>
        <!-- 类型 ------------------------------------------------>
        <el-form-item label="类型">
          <el-radio-group v-model="postfrom.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 富文本框 ----------------------------------------------------->
        <el-form-item label="内容">
          <VueEditor :config="config" ref="vueEditor" v-if="postfrom.type===1" />
          <!-- 上传视频 ------------------------------>
          <el-upload
            :headers="settoken()"
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :on-change="handleChange"
            :file-list="fileList"
            :on-success="handsuccess"
            :before-upload="handbefore"
            v-if="postfrom.type===2"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>

        <!-- 栏目 --------------------------------------------------------------->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in artlist" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 ------------------------------------------------------------------------------>
        <el-form-item label="封面">
          <el-upload
            action="http://127.0.0.1:3000/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="coverdel"
            :on-success="coversuccess"
            :headers="settoken()"
            :before-upload="beforeupload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 发布按钮 --------------------------------------------------------------------------------------->
        <el-form-item label="发布">
          <el-button type="success" @click="allpost">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { lanmu, sendpost } from '../api/user.js'
import VueEditor from 'vue-word-editor';
import 'quill/dist/quill.snow.css'
const cityOptions = [];
export default {
  components: {
    // 富文本框注册----
    VueEditor
  },

  data () {
    return {
      // 文章列表
      artlist: [],
      // 上传视频
      fileList: [
      ],
      // 栏目复选框-----------------------------
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      // 后台api数据------------------------------
      postfrom: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      // 封面------------------------------
      dialogImageUrl: '',
      dialogVisible: false,

      // 富文本框---------------------
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // 设置请求头
          headers: this.settoken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
            // // console.log(res);
            // if (res.data.message === '文件上传成功') {
            //   this.postfrom.content = res.data.data.url
            // }
          }
        },

        // 上传视频的配置
        uploadVideo: {
          // 设置请求头
          headers: this.settoken(),
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
            console.log(res);
            // if (res.data.message === '文件上传成功') {
            //   this.postfrom.content = res.data.data.url
            // }
          }
        }
      }

    }
  },

  methods: {
    // 栏目复选框-----------------------------------
    // 全选框
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.artlist.map(value => {
        return value.id
      }) : [];
      this.isIndeterminate = false;
    },
    // 单击某个复选框
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.artlist.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.artlist.length;
    },
    // 封面-------------------------------------------------
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 封面上传成功
    coversuccess (response) {
      console.log(response);
      if (response.message === '文件上传成功') {
        this.postfrom.cover.push({ id: response.data.id })
      }
    },
    // 移除封面
    coverdel (file) {
      console.log(file);
      let id = file.response.data.id
      // 遍历数组每一项
      for (let i = 0; i < this.postfrom.cover.length; i++) {
        if (this.postfrom.cover[i].id === id) {
          this.postfrom.cover.splice(i, 1)
          break
        }
      }
    },
    // 上传封面之前，判断是否图片格式
    beforeupload (file) {
      console.log(file);
      if (file.type.indexOf('image') !== -1) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      } else {
        this.$notify({
          title: '失败',
          message: '格式符合',
          position: 'bottom-right',
          type: 'error'
        })
        return false
      }
    },
    // 点击按钮发布
    async allpost () {
      // 富文本框内容赋值
      if (this.postfrom.type === 1) {
        var quill = this.$refs.vueEditor.editor;
        this.postfrom.content = quill.root.innerHTML
      }

      // 发布文章 获取栏目的数据
      this.checkedCities.forEach(value => {
        // console.log(value);
        this.postfrom.categories.push({
          id: value
        })
      })
      console.log(this.postfrom);
      let res2 = await sendpost(this.postfrom)
      console.log(res2);
      if (res2.data.message === '文章发布成功') {
        this.$router.push({ name: 'artlist' })
        this.$message({
          message: '发表成功',
          type: 'success'
        });
      }
    },
    // 上传视频
    handleChange (file, fileList) {
      // this.fileList = fileList.slice(-3);
      console.log(file);
    },
    handsuccess (response) {
      // if (file.response.message === '文件上传成功') {
      //   this.postfrom.content = file.data.url
      // }
      console.log(response);
      if (response.message === '文件上传成功') {
        this.postfrom.content = response.data.url
      }
    },
    // 类型 视频 上传视频之前的判断操作
    handbefore (file) {
      console.log(file);
      // 视频格式对应viedo
      if (file.type.indexOf('video') !== -1) {
        this.$notify({
          title: '成功',
          message: '文件上传完成',
          type: 'success'
        })
      } else {
        // 上传失败
        this.$notify({
          title: '失败',
          message: '上传格式不对',
          position: 'top-left',
          type: 'warning' })
        return false
      }
    },
    // 富文本框图片视频headers设置
    settoken () {
      let token = localStorage.getItem('heima_40_back_token')
      return {
        Authorization: token
      }
    }
  },
  // 栏目渲染
  async mounted () {
    let res = await lanmu()
    console.log(res);
    if (res.status === 200) {
      this.artlist = res.data.data.splice(2)
    }
  }

}
</script>

<style>

</style>
