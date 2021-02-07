<template>
  <div class="gaine">
    <div class="header">
      <p>品类管理--添加品类</p>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属品类">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="'/所有/'+item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类名称">
          <el-input v-model="form.categoryName" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getList,addCateName} from '@/api/cate'
export default {
  data() {
    return {
      form: {
        categoryName: "",
        parentId:'/所有'
      },
      options:[]
    };
  },
  computed: {},
  created() {},
  mounted() {
      this.gettList()
  },
  watch: {},
  methods: {
    async gettList(){
      let res = await getList(0)
      console.log(res);
      if(res.status == 0){
        this.options = res.data
      }
    },
    async onSubmit() {
      if(this.form.parentId == '/所有'){
         this.form.parentId = 0
      }
      
      let res = await addCateName(this.form.parentId,this.form.categoryName)
      console.log(res);
      if(res.status == 0){
        this.$message.success(res.data)
        this.$router.push('/home/category')
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
</style>
