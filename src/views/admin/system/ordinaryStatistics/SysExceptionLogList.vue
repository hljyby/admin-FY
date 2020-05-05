<template>
  <div class="main">
    <div class="topTool">
      <div id="xd-tool-bar">
        <!-- 左侧按钮 -->
        <!-- 右侧搜索 -->
        <div class="block" style="float: left;padding: 5px;">
          <el-date-picker
            v-model="value11"
            type="date"
            placeholder="日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            size="small"
          ></el-date-picker>
        </div>

        <div style="float: left ;padding: 5px;">
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
         <el-button  type="primary" size="small" @click="value11 ='';select1 = '';select2 = '' ">重置</el-button>
        </div>
        <div style="float: left;padding: 5px;">
                    <!-- <el-button type="primary" size="mini" @click="addList()">新增</el-button> -->
          <el-button type="primary" size="small" @click="exportExcel">导出excel</el-button>
        </div>
      </div>
    </div>
    <div class="flex-table">
      <div class="flex-table-wrap" style>
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData3"
          height="100%"
          id="out-table-2"
        >
          <!-- tooltip-effect="dark"
          <el-table-column type="selection" width="100px"></el-table-column>-->
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="DS" label="地市" width="100"></el-table-column>
          <el-table-column prop="SZQY" label="所在区域" show-overflow-tooltip></el-table-column>
          <el-table-column prop="LXBM" label="路线编码" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="LXMC" label="路线名称" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="YLSJJWZ" label="与邻省交界位置" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SQSL" label="设卡数量" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SQWZ" label="设卡位置" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SZBM" label="设置部门" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SSNR" label="实施内容" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="WSQYY" label="未设卡原因" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TJDWLXRXM" label="统计单位联系人姓名" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TJDWLXRDH" label="统计单位联系人电话" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SQXCLXRXM" label="设卡现场联系人姓名" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SQXCLXRDH" label="设卡现场联系人电话" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="JCCLS" label="检查车辆数" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TRJCRYS" label="投入检测人员数" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="JCRS" label="检测人数" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="FSRS" label="发烧人数" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="LGRS" label="留观人数" width="200" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="TPDZ" label="图片地址" width="200" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="ZDMC" label="站点名称" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="FBZT" label="封闭状态" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="JCQKSM" label="检测情况说明" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TBRQ" :formatter="formatter" label="填报日期" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="BZ" label="备注" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="SBZT" label="上报状态" show-overflow-tooltip></el-table-column>
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
    <!-- <div class="pop">
      <el-dialog title="请填写数据" :visible.sync="dialogForm">
        <el-form :model="form">
          <el-form-item label="地市" :label-width="formLabelWidth">
            <el-select v-model="form.DS" placeholder="请选择地市">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in formds"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <el-select v-model="form.SZQY" placeholder="请选择所在区域">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in formszqy"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路线编码" :label-width="formLabelWidth">
            <el-input v-model="form.LXBM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路线名称" :label-width="formLabelWidth">
            <el-input v-model="form.LXMC" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="与邻省交界位置" :label-width="formLabelWidth">
            <el-input v-model="form.YLSJJWZ" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设卡数量" :label-width="formLabelWidth">
            <el-input v-model="form.SQSL" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设卡位置" :label-width="formLabelWidth">
            <el-input v-model="form.SQWZ" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设置部门" :label-width="formLabelWidth">
            <el-input v-model="form.SZBM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="实施内容" :label-width="formLabelWidth">
            <el-input v-model="form.SSNR" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="未设卡原因" :label-width="formLabelWidth">
            <el-input v-model="form.WSQYY" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统计单位联系人姓名" :label-width="formLabelWidth">
            <el-input v-model="form.TJDWLXRXM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统计单位联系人电话" :label-width="formLabelWidth">
            <el-input v-model="form.TJDWLXRDH" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设卡现场联系人姓名" :label-width="formLabelWidth">
            <el-input v-model="form.SQXCLXRXM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设卡现场联系人电话" :label-width="formLabelWidth">
            <el-input v-model="form.SQXCLXRDH" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="投入检测人员数" :label-width="formLabelWidth">
            <el-input v-model="form.TRJCRYS" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="检测车辆数" :label-width="formLabelWidth">
            <el-input v-model="form.JCCLS" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="检测人数" :label-width="formLabelWidth">
            <el-input v-model="form.JCRS" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发烧人数" :label-width="formLabelWidth">
            <el-input v-model="form.FSRS" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="留观人数" :label-width="formLabelWidth">
            <el-input v-model="form.LGRS" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="检测情况说明" :label-width="formLabelWidth">
            <el-input v-model="form.JCQKSM" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.BZ" autocomplete="off"></el-input>
          </el-form-item>

                    <el-form-item label="填表日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.TBRQ"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>          </el-form-item>

          <el-form-item label="上报状态" :label-width="formLabelWidth">
            <el-select v-model="form.SBZT" placeholder="请选择">
              <el-option :label="'未上报 '" :value="'未上报'"></el-option>
              <el-option :label="'已上报'" :value="'已上报'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点名称" :label-width="formLabelWidth">
            <el-input v-model="form.ZDMC" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封闭状态" :label-width="formLabelWidth">
            <el-select v-model="form.FBZT" placeholder="请选择">
              <el-option :label="'未封闭'" :value="'未封闭'"></el-option>
              <el-option :label="'限制通行'" :value="'限制通行'"></el-option>
              <el-option :label="'已封闭'" :value="'已封闭'"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="appname('cancel')">取 消</el-button>
          <el-button type="primary" @click="appname('ok_add')">确 定</el-button>
        </div>
      </el-dialog>
    </div> -->
        <OrdinaryForm :formds="formds" :formszqy="formszqy" :form="form" :visible="dialogForm" @appname="appname" :formtype="formtype" />
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
import OrdinaryForm from "@/components/form/OrdinaryForm.vue"

export default {
  name: "allStatistics",
    components:{
OrdinaryForm
  },
  data() {
    return {
      centerDialogVisible: false,
      currentPage: 1,
      tableData: [],
      input5: "",
      select1: "",
      select2: "",
      value11: "",
      ds: [], //地市
      szqy: [], //所在区域
      tableData3: [],
      loading: true,
      cityData: [],
      formds: [],
      formszqy: [],
      formLabelWidth: "180px",
      formtype: "add", //表单的类型（新增 or 编辑）
      dialogForm: false,
      id:null,
      form: {
        DS: "",
        SZQY: "",
        LXBM: "",
        LXMC: "",
        YLSJJWZ: "",
        SQSL: "",
        SQWZ: "",
        SZBM: "",
        SSNR: "",
        WSQYY: "",
        TJDWLXRXM: "",
        TJDWLXRDH: "",
        SQXCLXRXM: "",
        SQXCLXRDH: "",
        TRJCRYS: "",
        JCCLS: "",
        JCRS: "",
        FSRS: "",
        LGRS: "",
        JCQKSM: "",
        BZ: "",
        TBRQ: "",
        SBZT: "未上报",
        TPDZ: "",
        ZDMC: "",
        FBZT: "未封闭"
      },
      form_plac: {
        DS: "",
        SZQY: "",
        LXBM: "",
        LXMC: "",
        YLSJJWZ: "",
        SQSL: "",
        SQWZ: "",
        SZBM: "",
        SSNR: "",
        WSQYY: "",
        TJDWLXRXM: "",
        TJDWLXRDH: "",
        SQXCLXRXM: "",
        SQXCLXRDH: "",
        TRJCRYS: "",
        JCCLS: "",
        JCRS: "",
        FSRS: "",
        LGRS: "",
        JCQKSM: "",
        BZ: "",
        TBRQ: "",
        SBZT: "未上报",
        TPDZ: "",
        ZDMC: "",
        FBZT: "未封闭"
      }
    };
  },
  computed:{
    route(){
      return this.$route.path
    }
  },  methods: {
    exportExcel() {
      let fix = document.querySelector(".el-table__fixed-right");
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
         let dm = document.querySelectorAll('#out-table-2 .el-table__fixed-body-wrapper .el-table__body tbody tr')
            let dm2 = document.querySelectorAll('#out-table-2 .el-table__fixed-header-wrapper .el-table__header thead tr')
      let dmlist = []
      let dm2list = []
                  for(let i=0;i<dm.length;i++){
        if(dm[i].lastChild){
                  dmlist.push(dm[i].lastChild)
        dm[i].removeChild(dm[i].lastChild)
        }
      }
            for(let i=0;i<dm2.length;i++){
        if(dm2[i].lastChild){
                  dm2list.push(dm2[i].lastChild)
        dm2[i].removeChild(dm2[i].lastChild)
        }
      }
      // dm.forEach(v=>{
      //   if(v.lastChild){
      //   dmlist.push(v.lastChild)
      //   v.removeChild(v.lastChild)
      //   }
      // })
      //       dm2.forEach(v=>{
      //   if(v.lastChild){
      //   dm2list.push(v.lastChild)
      //   v.removeChild(v.lastChild)
      //   }
      // })
        wb = XLSX.utils.table_to_book(
          document.querySelector("#out-table-2").removeChild(fix)
        );
                              for(let i=0;i<dm.length;i++){
        if(dm[i].lastChild){
        dm[i].appendChild(dmlist[i])
        }
      }
            for(let i=0;i<dm2.length;i++){
        if(dm2[i].lastChild){
        dm2[i].appendChild(dm2list[i])
        }
      }
      //     dm.forEach((v,index)=>{
      //   if(v.lastChild){
      //   v.appendChild(dmlist[index])
      //   }
      // })
      //               dm2.forEach((v,index)=>{
      //   if(v.lastChild){
      //   v.appendChild(dm2list[index])
      //   }
      // })
        document.querySelector("#out-table-2").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#out-table-2"));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "抄表功能.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
        formatter(row){
      return row.TBRQ.substring(0,10)
    },
    search() {
      if(!this.value11){
        this.value11 = ""
      }
      this.$post(
          `api/PTGXSJCRK/GetPtgxsjcrkAllList?ds=${encodeURI(this.select1)}&szqy=${encodeURI(this.select2)}&tbrq=${this.value11}`
        )
        .then(res => {
          if (res.data.Message == "OK") {
            let data = JSON.parse(res.data.Data);
            this.tableData3 = data;
          }
        });
    },
      ok() {
      this.centerDialogVisible = false;
      this.deletList(this.id);
    },
    addList() {
      this.dialogForm = true;
      this.formtype = "add";
    },
    appname(item,item2) {
      //表单提交
        this.dialogForm = false;
      // if (item == "ok_add" && this.formtype == "add") {
      //   //新增
      //   let model = item2;
      //   let sbzt = model.SBZT == '未上报'?1:2
      //   let json = JSON.stringify(model);
      //   // let json = JSON.stringify(data)
      //   this.$post(`api/PTGXSJCRK/InsertPtgxsjcrk?sbzt=${sbzt}`, json).then(res => {
      //     if (res.data.Message == "OK") {
      //       this.open4();
      //       this.search();
      //       this.form = { ...this.form_plac };
      //     } else {
      //       this.open6();
      //     }
      //   });
      // }
      if (item == "ok_add" && this.formtype == "edit") {
        //编辑
        let model = item2;
        let sbzt = model.SBZT == '未上报'?1:2
        let json = JSON.stringify(model);
        this.$post(`api/PTGXSJCRK/UpdatePtgxsjcrk?sbzt=${sbzt}`, json).then(res => {
          if (res.data.Message == "OK") {
            this.open5();
            this.search();
            this.form = { ...this.form_plac };
          } else {
            this.open6();
          }
        });
      }
    },
    deletList(item) {
      this.$post(`api/PTGXSJCRK/DeletePtgxsjcrk/${item}`).then(res => {
        if (res.data.Message == "OK") {
          this.open3();
          this.search();
          this.id = null
        } else {
          this.open6();
        }
      });
    },
    edit(item) {
      this.formtype = "edit";
      this.form = item;
      this.dialogForm = true;
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
    this.$post(`api/PTGXSJCRK/GetPtgxsjcrkAllList?ds=&szqy=&tbrq=`)
      .then(res => {
        if (res.data.Message == "OK") {
          let data = JSON.parse(res.data.Data);
          this.loading = false;
          this.tableData3 = data;
        }
      });

    this.$post(`api/DW/GetDwList?ds=&szqy=`).then(res => {
      //
      if (res.data.Message == "OK") {
        let data = JSON.parse(res.data.Data);
        this.cityData = data;
        data.forEach(v => {
          if (v.JB == 2) {
            this.ds.push(v);
                        this.formds.push(v);

          }
        });
                this.cityData.forEach(v => {
          if (v.JB == 3) {
            this.formszqy.push(v);
          }
        });
      }
    });
  },
  watch: {
    select1(news) {
      this.szqy = [];
      this.select2 = "";
      this.cityData.forEach(v => {
        if (news == v.SJDWMC) {
          this.szqy.push(v);
        }
      });
    },
        dialogForm(news) {
      if (!news) {
        this.form = { ...this.form_plac };
      }
    },
    route(news){
      if(news === "/ordinaryStatisticsInformationManagement" && this.$route.query.code === "ok_1"){
        this.search()
        delete this.$route.query.code
      }
    }
  }
};
</script>
<style scoped>

</style>
