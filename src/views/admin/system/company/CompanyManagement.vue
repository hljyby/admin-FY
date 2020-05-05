<template>
  <div class="main">
    <div class="topTool">
      <div style="float: left;padding: 5px;">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" size="small">
          <el-select class="select-ds" v-model="select1" slot="prepend" placeholder="地市">
            <el-option :label="item.DWMC" :value="item.DWMC" v-for="item in ds" :key="item.ID"></el-option>
          </el-select>
          <el-select class="select-szqy" v-model="select2" slot="prepend" placeholder="所在区域">
            <el-option :label="item.DWMC" :value="item.DWMC" v-for="item in szqy" :key="item.ID"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div style="float: left;padding: 5px;">
        <el-button type="primary" size="small" @click="select1 = '';select2 = '' ">重置</el-button>
      </div>
      <div style="float: left;padding: 5px;">
        <el-button type="primary" size="small" @click="addList()">新增</el-button>
      </div>
    </div>
    <div class="flex-table">
      <div class="flex-table-wrap" style>
        <el-table :data="tableData3" height="100%" v-loading="loading" style="width: 100%">
          <el-table-column label="序号" width="180" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="DWBM" label="单位编码" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="DWMC" label="单位名称" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="SJDWBM" label="上级单位编码" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="SJDWMC" label="上级单位名称" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column prop="JB" :formatter="formatter" label="级别" show-overflow-tooltip width="180"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="id = scope.row.ID ;centerDialogVisible = true"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pop">
      <el-dialog title="请填写数据" :visible.sync="dialogForm">
        <el-form :model="form">
          <el-form-item label="单位编码" :label-width="formLabelWidth">
            <el-input v-model="form.DWBM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.DWMC" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别" :label-width="formLabelWidth">
            <el-select v-model="form.JB" placeholder="请选择单位级别">
              <el-option :label="'一级单位'" :value="1" v-if="form.JB == 1"></el-option>
              <el-option :label="'二级单位'" :value="2"></el-option>
              <el-option :label="'三级单位'" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级单位" :label-width="formLabelWidth">
            <el-select v-model="form.SJDWMC" placeholder="请选择上级单位">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in formJB"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级单位编码" :label-width="formLabelWidth">
            <el-input v-model="form.SJDWBM" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上级单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.SJDWMC" autocomplete="off" :disabled="true"></el-input>
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
      input5: "",
      select1: "",
      dialogForm: false,
      formtype:"",
      form: {
        DWBM: "",
        DWMC: "",
        JB: "",
        SJDWBM: "",
        SJDWMC: ""
      },
      form_place: {
        DWBM: "",
        DWMC: "",
        JB: "",
        SJDWBM: "",
        SJDWMC: ""
      },
      formLabelWidth: "120px",
      formJB: [], //单位级别数组集合
      ds: [],
      szqy: [],
      select2: ""
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
      this.$ajax.post(`api/DW/DeleteDw/${item}`).then(res => {
        if (res.data.Message == "OK") {
          this.open3();
          this.search();
        } else {
          this.open6();
        }
      });
    },
    formatter(row){
      if(row.JB == 1){
        return "一级单位"
      }
            if(row.JB == 2){
        return "二级单位"
      }
            if(row.JB == 3){
        return "三级单位"
      }
    },

    addList() {
      this.dialogForm = true;
      this.formtype = "add";
    },
    search() {
      this.loading = true;
      this.$post(
          `api/DW/GetDwList?ds=${encodeURI(this.select1)}&szqy=${encodeURI(
            this.select2
          )}`
        )
        .then(res => {
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
        this.$ajax.post(`api/DW/InsertDw`, json).then(res => {
          if (res.data.Message == "OK") {
            this.open4();
            this.search();
            this.form = { ...this.form_place };
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
        this.$ajax.post(`api/DW/UpdateDw`, json).then(res => {
          if (res.data.Message == "OK") {
            this.open5();
            this.search();
            this.form = { ...this.form_place };
          } else {
            this.open6();
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
    this.$ajax.post("api/DW/GetDwList?ds=&szqy=").then(res => {
      if (res.statusText == "OK") {
        this.loading = false;
        let data = JSON.parse(res.data.Data);
        this.tableData3 = data;
        data.forEach(v => {
          if (v.JB == 2) {
            this.ds.push(v);
          }
        });
      }
    });
  },
  computed: {
    JB() {
      return this.form.JB;
    },
    SJDWMC() {
      return this.form.SJDWMC;
    }
  },
  watch: {
    JB(news) {
      this.formJB = [];
      if (this.formtype == "add") {
        this.form.SJDWBM = ""; // 上级单位级别一动 清空上级单位编码及名称
        this.form.SJDWMC = "";
      }
      this.tableData3.forEach(v => {
        if (v.JB == news - 1) {
          this.formJB.push(v);
        }
      });
    },
    SJDWMC(news) {
      this.tableData3.forEach(v => {
        if (v.SJDWMC == news) {
          this.form.SJDWBM = v.SJDWBM;
        }
      });
    },
    dialogForm(news) {
      if (!news) {
        this.form = { ...this.form_plac };
      }
    },
    select1(news) {
      this.szqy = [];
      this.select2 = "";
      this.tableData3.forEach(v => {
        if (news == v.SJDWMC) {
          this.szqy.push(v);
        }
      });
    }
  }
};
</script>
<style scoped>
.pop .el-select .el-input {
  width: 100%;
}
</style>

