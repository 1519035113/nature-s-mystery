<template>
  <div class="gaine">
    <div class="header">
      <p v-if="this.$route.query.id">商品管理 -- 修改商品</p>
      <p v-else>商品管理 -- 添加商品</p>
    </div>
    <div class="content">
      <div class="box">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" style="width:440px" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.subtitle" style="width:440px" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="form.parentCategoryId" @change="changeFirst" placeholder="请选择一级分类">
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="form.categoryId" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price" style="width:250px">
              <el-button slot="append">元</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="form.stock" style="width:250px">
              <el-button slot="append">件</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <img
              v-if="this.$route.query.id"
              style="width:78px;height:78px"
              :src="form.subImages"
              alt
            />
            <!-- <el-upload
              v-else
              class="avatar-uploader"
              action="https://admintest.happymmall.com/manage/product/upload.do"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <el-upload
              v-else
              class="avatar-uploader"
              action="http://admintest.happymmall.com/manage/product/upload.do"
              :show-file-list="false"
              :on-success="shangchuan"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品详情">
            <div v-html="form.detail"></div>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDetail,
  getCate,
  getEdit,
  zhuanPhoto,
  setData
} from "@/api/product";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      form: {
        name: "",
        subtitle: "",
        status: null,
        parentCategoryId: null,
        categoryId: null,
        price: null,
        stock: null,
        subImages: "http://www.baidu.com",
        detail: "<p>111</p>"
      },
      options1: [],
      options2: [],
      imageUrl: ""
    };
  },
  computed: {},
  created() {
    let iid = this.$route.query.id;
    if (iid) {
      this.gettDetail(iid);
    }
  },
  mounted() {
    this.gettCate1();
    console.log(Cookies.get("JSESSIONID"));
    console.log(Cookies.get("SID"));
  },
  watch: {},
  methods: {
    //   获取数据
    async gettDetail(iid) {
      let res = await getDetail(iid);
      console.log(res);
      if (res.status == 0) {
        this.form = res.data;

        this.gettCate2();
      }
    },
    // 获取一级分类
    async gettCate1() {
      let pCategoryId = 0;
      let res = await getCate(pCategoryId);
      console.log(res);
      if (res.status == 0) {
        this.options1 = res.data;
      }
    },
    changeFirst() {
      console.log("1111");

      this.gettCate2();
    },
    // 获取二级分类
    async gettCate2() {
      let res = await getCate(this.form.parentCategoryId);
      console.log(res);
      if (res.status == 0) {
        this.options2 = res.data;
      }
    },
    // 提交
    async submit() {
      let id = this.$route.query.id;
      let gstatus = 1;
      if (id) {
        let res = await getEdit(
          this.form.categoryId,
          this.form.name,
          this.form.subtitle,
          this.form.subImages,
          this.form.detail,
          this.form.price,
          this.form.stock,
          this.form.status,
          id
        );
        console.log(res);
        if (res.status == 0) {
          this.$message.success(res.data);
          this.$router.push("/home/product");
        }
      } else {
        let res = await setData(
          this.form.categoryId,
          this.form.name,
          this.form.subtitle,
          this.form.subImages,
          this.form.detail,
          this.form.price,
          this.form.stock,
          gstatus
        );
        console.log(res);
        if (res.status == 0) {
          this.$message.success(res.data);
          this.$router.push("/home/product");
        }
      }
      // console.log(res);
      // if (res.status == 0) {
      //   this.$message.success(res.data);
      //   this.$router.push("/home/product");
      // }
    },
    // 上传图片
    async shangchuan(event, file, fileList) {
      console.log(file);
      var formData = new FormData();
      formData.append("file", file.raw);
      let res = await zhuanPhoto(formData);
      if (res.code == 200) {
        this.form.subImages = res.data.path;
        this.imageUrl = res.data.path;
      }
      console.log(this.studentForm);
      console.log("111111");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.gaine {
  width: 100%;
  height: 100%;
}
.header {
  width: 95%;
  margin: 0 25px;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  p {
    font-size: 28px;
    color: #666;
  }
}
.content {
  width: 95%;
  margin: 0 25px;
  padding: 15px 0;
}
.el-form-item__label {
  color: #000;
  font-weight: bold;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
