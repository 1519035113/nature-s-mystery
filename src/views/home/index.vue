<template>
  <div class="gaine">
    <el-container>
      <el-header>
        <div class="left">MMALL ADMIN</div>
        <div class="right">
          <span>欢迎, admin</span>
          <el-button @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#F8F8F8"
            text-color="#337AB7"
            active-text-color="#000"
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-finished"></i>
              <span slot="title">Home</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/product">商品管理</el-menu-item>
                <el-menu-item index="/home/category">品类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-paperclip"></i>
                <span>订单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/order">订单管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Logout } from "@/api/login";
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 退出登录
    async logout() {
      let res = await Logout();
      if (res.status == 0) {
        this.$message.success("退出成功");
        localStorage.removeItem("userInfo");
        this.$router.push("/");
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {}
};
</script>

<style scoped>
.gaine {
  width: 100%;
  height: 100%;
}
.left {
  font-size: 18px;
}
.el-header {
  background-color: #f8f8f8;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #f8f8f8;
  color: #333;
  height: 100vh;
}

.el-main {
  background-color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
}
</style>
