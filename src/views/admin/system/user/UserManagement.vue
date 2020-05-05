<template>
  <div class="main">
    <div class="topTool">

      <div style="float: left;padding: 5px;">
        <el-button type="primary" size="small" @click="addList()">新增</el-button>
      </div>
      <!-- <div style="float: left;padding: 5px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" size="small">
          <el-select v-model="select1" slot="prepend" placeholder="请选择单位">
            <el-option
              :label="item.DWMC"
              :value="item.DWMC"
              v-for="item in tableData3"
              :key="item.ID"
            ></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div> -->

    </div>
    <div class="flex-table">
      <div class="flex-table-wrap" style>
        <el-table :data="tableData3" height="100%" v-loading="loading" style="width: 100%">
          <el-table-column label="序号" width="180" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="DLXM" label="登录姓名" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="DLMM" label="登录密码" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="DWBM" label="单位编码" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="DWMC" label="单位名称" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="id = scope.row.ID ;centerDialogVisible = true ">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pop">
      <el-dialog title="请填写数据" :visible.sync="dialogForm">
        <el-form :model="form">
          <el-form-item label="请选择单位" :label-width="formLabelWidth">
            <el-select v-model="form.DWMC" placeholder="请选择单位名称">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in cityData"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位编码" :label-width="formLabelWidth">
            <el-input v-model="form.DWBM" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.DWMC" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-select v-model="form.YHQX" placeholder="请选择用户权限">
            <el-option :label="'用户'" :value="'用户'"></el-option>
            <el-option :label="'管理员'" :value="'管理员'"></el-option>
          </el-select>          
          </el-form-item>
          <el-form-item label="登录姓名" :label-width="formLabelWidth">
            <el-input v-model="form.DLXM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" :label-width="formLabelWidth">
            <el-input v-model="form.DLMM" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addoredit('cancel')">取 消</el-button>
          <el-button type="primary" @click="addoredit('ok_add')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
      <div class="deletePop">
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span style="text-align:center">请确认是否删除该条数据</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ok">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "usermanagement",
  data() {
    return {
       centerDialogVisible: false,
      id: null,
      tableData3: [],
      loading: true,
      input5: null,
      select1: null,
      dialogForm: false,
      form: {
        DLXM: "",
        DLMM: "",
        DWBM: "",
        DWMC: "",
        YHQX:'用户'
      },
      form_plac: {
        DLXM: "",
        DLMM: "",
        DWBM: "",
        DWMC: "",
        YHQX:'用户'
      },
      formLabelWidth: "120px",
      cityData:[],
    };
  },
  methods: {
    edit(item) {
      this.dialogForm = true;
      this.formtype = "edit";
      this.form = item;
    },
        ok() {
      this.centerDialogVisible = false;
      this.deletList(this.id);
    },
    deletList(item) {
      this.$post(`api/YH/DeleteYh/${item}`).then(res => {
        if (res.data.Message == "OK") {
          this.open3();
          this.search();
        } else {
          this.open6();
        }
      });
    },
    addList() {
      this.dialogForm = true;
      this.formtype = "add";
    },
    search() {
      this.loading = true;
      this.$post(
          `api/YH/GetYhAllList`
        ).then(res => {
          if (res.data.Message == "OK") {
            this.loading = false;
            let data = JSON.parse(res.data.Data);
            this.tableData3 = data;
          }
        });
    },
    addoredit(item) {
      if (item == "cancel") {
        this.dialogForm = false;
      }
      if (item == "ok_add" && this.formtype == "add") {
        //新增
        this.dialogForm = false;
        let model = this.form;
        let json = JSON.stringify(model);
        // let json = JSON.stringify(data)
        this.$post(`api/YH/InsertYh`, json).then(res => {
          if (res.data.Message == "OK") {
            this.open4();
            this.search();
            this.form = { ...this.form_plac };
          } else {
            this.open6();
          }
        });
      }
      if (item == "ok_add" && this.formtype == "edit") {
        //编辑
        this.dialogForm = false;
        let model = this.form;
        let json = JSON.stringify(model);
        this.$post(`api/YH/UpdateYh`, json).then(res => {
          if (res.data.Message == "OK") {
            this.open5();
            this.search();
            this.form = { ...this.form_plac };
          } else {
            this.open6(); //用一个函数解决的问题，用了这么多当时脑子抽了
          }
        });
      }
    },
    open3() {
      this.$notify({
        title: "删除成功，数据已更新",
        type: "success"
      });
    },
    open4() {
      this.$notify({
        title: "添加成功，数据已更新",
        type: "success"
      });
    },
    open5() {
      this.$notify({
        title: "编辑成功，数据已更新",
        type: "success"
      });
    },
    open6() {
      this.$notify({
        title: "操作失败",
        type: "warning"
      });
    }
  },
  mounted() {
    this.$post("api/YH/GetYhAllList").then(res => {
      if (res.statusText == "OK") {
        this.loading = false;
        let data = JSON.parse(res.data.Data);
        this.tableData3 = data;
      }
    });
        this.$post(`api/DW/GetDwList?ds=&szqy=`).then(res => {
      if (res.data.Message == "OK") {
        let data = JSON.parse(res.data.Data);
        this.cityData = data;
      }
    });
  },
  computed:{
    DWMC(){
      return this.form.DWMC
    }
  },
  watch:{
    DWMC(news){
      this.cityData.forEach(v=>{
        if(v.DWMC == news){
          this.form.DWBM = v.DWBM
        }
      })
    },
        dialogForm(news) {
      if (!news) {
        this.form = { ...this.form_plac };
      }
    }
  }
};
</script>
<style scoped>
.pop .el-select .el-input {
  width: 100%;
}
</style>

