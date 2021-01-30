<template>
  <div class="gaine">
    <div class="header">
      <p>商品详情</p>
    </div>
    <div class="content">
      <div class="box">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" style="width:440px"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.subtitle" style="width:440px"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="form.parentCategoryId" placeholder="请选择">
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
            <img style="width:78px;height:78px" :src="form.subImages" alt />
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
import { getDetail, getCate, getEdit } from "@/api/product";
export default {
  data() {
    return {
      form: {
        name: "",
        subtitle: "",
        status: 1,
        parentCategoryId: 0,
        categoryId: 0,
        price: 0,
        stock: 0,
        subImages: "",
        detail: ""
      },
      options1: [],
      options2: []
    };
  },
  computed: {},
  created() {
    let iid = this.$route.query.id;
    this.gettDetail(iid);
  },
  mounted() {
    this.gettCate1();
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
      let res = await getCate(this.form.parentCategoryId);
      console.log(res);
      if (res.status == 0) {
        this.options1 = res.data;
      }
    },
    // 获取二级分类
    async gettCate2() {
      let res = await getCate(this.form.parentCategoryId);
      console.log(res);
      if (res.status == 0) {
        this.options2 = res.data;
      }
    },
    async submit() {
      let id = this.$route.query.id;
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
        this.$router.push('/home/product')
      }
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
</style>
