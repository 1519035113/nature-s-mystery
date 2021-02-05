<template>
  <div class="gaine">
    <div class="header">
      <p>品类管理</p>
      <el-button type="primary" icon="el-icon-plus" @click="$router.push('/home/c_add')">添加品类</el-button>
    </div>
    <div class="content">
      <p @click="aa">当前商品分类ID:{{cateId}}</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="品类ID"></el-table-column>
        <el-table-column prop="name" label="品类名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editName(scope.row.name,scope.row.id)" type="text">修改名称</el-button>
            <el-button v-if="flag" @click="lookCate(scope.row.id)" type="text">查看其子品类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="请输入新的品类名称" width="400px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, setName } from "@/api/cate";
export default {
  data() {
    return {
      tableData: [],
      cateId: 0,
      flag: true,
      dialogFormVisible: false,
      form: {
        name: "",
        id: 0
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.gettList();
  },
  watch: {},
  methods: {
    aa(){
      location.reload()
    },
    // 获取列表数据
    async gettList() {
      let res = await getList(this.cateId);
      console.log(res);
      if (res.status == 0) {
        this.tableData = res.data;
      }
    },
    // 修改名称
    editName(name, id) {
      this.dialogFormVisible = true;
      this.form.name = name;
      this.form.id = id;
    },
    // 确定修改
    editTrue() {
      this.$confirm("是否更新品类名字?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await setName(this.form.id, this.form.name);
          if (res.status == 0) {
            this.$message.success("更新品类名字成功");
            this.gettList();
            this.dialogFormVisible = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改"
          });
        });
    },
    // 查看子品类
    lookCate(id) {
      this.flag = false;
      this.cateId = id;
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
  display: flex;
  justify-content: space-between;
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
