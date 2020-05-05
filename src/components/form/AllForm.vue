<template>
  <div class="allform">
          <div class="pop">
      <el-dialog title="请填写数据" :visible.sync="dialogForm">
        <el-form :model="form">
          <el-form-item label="地市" :label-width="formLabelWidth">
            <el-select v-model="form.DS" placeholder="请选择地市" :disabled="true">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in formds"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <el-select v-model="form.SZQY" placeholder="请选择所在区域" :disabled="true">
              <el-option
                :label="item.DWMC"
                :value="item.DWMC"
                v-for="item in formszqy"
                :key="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路线编码" :label-width="formLabelWidth">
            <el-input v-model="form.LXBM" autocomplete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="路线名称" :label-width="formLabelWidth">
            <el-input v-model="form.LXMC" autocomplete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="与邻省交界点" :label-width="formLabelWidth">
            <el-input v-model="form.YLSJJD" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="界点位置" :label-width="formLabelWidth">
            <el-input v-model="form.JDWZ" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设卡数量" :label-width="formLabelWidth">
            <el-input v-model="form.SKSL" autocomplete="off"></el-input>
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
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.BZ" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上报日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.SBRQ"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="未设卡原因" :label-width="formLabelWidth">
            <el-select v-model="form.WSQYY" placeholder="请选择">
              <el-option :label="'断头路'" :value="'断头路'"></el-option>
              <el-option :label="'封闭交通'" :value="'封闭交通'"></el-option>
              <el-option :label="'其他'" :value="'其他'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报状态" :label-width="formLabelWidth">
            <el-select v-model="form.SBZT" placeholder="请选择">
              <el-option :label="'未上报'" :value="'未上报'"></el-option>
              <el-option :label="'已上报'" :value="'已上报'"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('cancel')">取 消</el-button>
          <el-button type="primary" @click="cancel('ok_add')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "allform",
  props:["form",'formds',"formszqy","visible","formtype"],
  data(){
      return{
          dialogForm:false,
          addoredit:"",
                formLabelWidth: "120px",
      }
  },
  methods:{
      cancel(item){
          this.addoredit = item
          this.dialogForm = false
      }
  },
    watch:{
        visible(news){
            this.dialogForm = news
        },
        dialogForm(news){
            if(!news){
                this.$emit('appname',this.addoredit,this.form)
                          this.addoredit = ""

            }
        }
    }
};
</script>

<style scoped>
</style>