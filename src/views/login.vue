<template >
  <div class="login" @keyup.13="login">
    <img src="../img/login-bg.jpg" alt />
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
            prefix-icon="icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入6~16位的密码"
            clearable
            prefix-icon="icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { userlogin } from '../api/user.js'
export default {
  data () {
    return {
      loginForm: {
        username: '10086',
        password: '12345678'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login () {
    //  数据是否合法，合法再请求数据
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await userlogin(this.loginForm)
          console.log(res);
          if (res.data.message === '登录成功') {
            localStorage.setItem('heima_40_back_token', res.data.data.token)
            this.$router.push({ name: 'index' })
            this.$message.success(res.data.message)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  >img{
    width: 100%;
    height: 100%;
    position:absolute ;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
