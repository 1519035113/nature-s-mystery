<template>
  <div class="gaine">
    <div class="login">
      <div class="login-header">请登录</div>
      <div class="login-box">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="User Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" type="password" placeholder="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary" style="width:100%">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/login";
let qs = require("qs");
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    async login() {
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        this.$message.info("用户名或密码不能为空");
        return false;
      }
      let data = qs.stringify(this.loginForm);
      let res = await Login(data);
      console.log(res);
      if (res.status == 1) {
        this.$message.error(res.msg);
      } else {
        this.$message.success(res.msg);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        this.$router.push("/home");
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.gaine {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 445px;
    height: 235px;
    border: 1px solid #ccc;
    border-radius: 4px;
    .login-header {
      height: 38px;
      text-indent: 15px;
      background: #f5f5f5;
      line-height: 38px;
    }
    .login-box {
      padding: 15px 15px;
    }
  }
}
</style>
