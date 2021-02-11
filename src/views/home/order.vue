<template>
  <div class="gaine">
    <div class="header">
      <p>订单管理</p>
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
        <el-input v-model="query" style="width:200px;margin:0 15px" placeholder="订单号"></el-input>
        <el-button @click="search">查询</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="receiverName" label="收件人"></el-table-column>
        <el-table-column prop="statusDesc" label="订单状态"></el-table-column>
        <el-table-column prop="payment" label="订单总价"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
import { getList, getNameList } from "@/api/order";
export default {
  data() {
    return {
      options: [
        {
          value: 1,
          label: "按订单号查询"
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
    this.gettList();
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

      if (this.query !== "") {
        let res = await getNameList(this.listType, this.pageNum, this.query);
        if (res.status == 0) {
          this.tableData = res.data.list;
          this.totals = res.data.total;
        }
      } else {
        this.gettList();
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.gettList();
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
.inp {
  display: flex;
  margin: 10px 0;
}
</style>
