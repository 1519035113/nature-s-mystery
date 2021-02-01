<template>
  <div class="gaine">
    <div class="header">
      <p>商品管理</p>
      <el-button type="primary" icon="el-icon-plus" @click="$router.push('/home/p_save')">添加商品</el-button>
    </div>
    <div class="content">
      <div class="inp">
        <el-select v-model="type" style="width:160px" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="query" style="width:200px;margin:0 15px" placeholder="请输入内容"></el-input>
        <el-button @click="search">查询</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="信息">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>{{scope.row.subtitle}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">在售</span>
            <span v-else>已下架</span>
            <el-button
              v-if="scope.row.status == 1"
              size="mini"
              style="margin:0 5px;padding:3px 5px"
              type="success"
              @click="xiajia(scope.row.id,scope.row.status)"
            >下架</el-button>
            <el-button
              v-if="scope.row.status == 2"
              size="mini"
              style="margin:0 5px;padding:3px 5px"
              type="success"
              @click="shangjia(scope.row.id,scope.row.status)"
            >上架</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="lookDetail(scope.row.id)" type="text">查看</el-button>
            <el-button @click="edit(scope.row.id)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="totals"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getIdList, getNameList, xjData, sjData } from "@/api/product";
export default {
  data() {
    return {
      options: [
        {
          value: 1,
          label: "按商品id查询"
        },
        {
          value: 2,
          label: "按商品名称查询"
        }
      ],
      listType: "search",
      pageNum: 1,
      totals: 0,
      type: "",
      query: "",
      tableData: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.gettList(); //获取列表数据
  },
  watch: {},
  methods: {
    // 获取列表数据
    async gettList() {
      let res = await getList(this.pageNum);
      console.log(res);
      if (res.status == 0) {
        this.tableData = res.data.list;
        this.totals = res.data.total;
      }
    },
    // 查询
    async search() {
      console.log(this.type);
      console.log(this.query);
      if (this.type == 1) {
        let res = await getIdList(this.listType, this.pageNum, this.query);
        if (res.status == 0) {
          this.tableData = res.data.list;
          this.totals = res.data.total;
        }
      } else {
        let res = await getNameList(this.listType, this.pageNum, this.query);
        if (res.status == 0) {
          this.tableData = res.data.list;
          this.totals = res.data.total;
        }
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.gettList();
    },
    // 下架
    xiajia(id, data) {
      let status = data == 1 ? 2 : 1;
      console.log(status);
      this.$confirm("确认要下架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await xjData(id, status);
          console.log(res);
          if (res.status == 0) {
            this.$message.success(res.data);
            this.gettList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    // 上架
    shangjia(id, data) {
      let status = data == 1 ? 2 : 1;
      console.log(status);
      this.$confirm("确认要上架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await xjData(id, status);
          console.log(res);
          if (res.status == 0) {
            this.$message.success(res.data);
            this.gettList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上架"
          });
        });
    },
    // 查看
    lookDetail(id){
      this.$router.push('/home/p_detail?id='+id)
    },
    // 编辑
    edit(id){
      this.$router.push('/home/p_save?id='+id)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.inp {
  display: flex;
  margin: 10px 0;
}
</style>
