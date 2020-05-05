<template>
  <div class="login-wrap">
    <div class="ms-title">用户登录</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <!-- :rules="rules" -->
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>

        <el-checkbox v-model="checked" class="remember">记住账号</el-checkbox>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
// import qs from 'qs'
// import axios from 'axios'
import Axios from 'axios'

export default {
  data: function() {
    return {
      checked: false,
      ruleForm: {
        username: "",
        password: "",
        verifycode: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifycode: [
          { required: false, message: "请输入验证码", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // var data= {"dlxm":"黑龙江省","dlmm":"15561823553"}
          // this.$router.push("/");

          this.$post(
              `/api/YH/ManageLogin?dlxm=${encodeURI(this.ruleForm.username)}&dlmm=${encodeURI(this.ruleForm.password)}`
            )
            .then(res => {
              if (res.data.Message == "OK") {
                let data = JSON.parse(res.data.Data);
                for (let i in data) {
                  window.localStorage[i] = data[i];
                  Axios.defaults.headers.post['Authorization'] = `Bearer ${window.localStorage.Token}`;

                }
                this.$router.push("/");
              }else{
                this.open6(res.data.Message)
              }
            });
        } else {
          return false;
        }
      });
    },
        open6(item) {
      this.$notify({
        title: item,
        type: "warning"
      });
    }
  }
};
</script>
<style scoped >
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /*background:cornflowerblue;*/
  background: steelblue;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 250px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #ccc;
}
.login-btn {
  margin-bottom: 10px;
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.remember {
  margin: 3px 0 10px 0;
}
</style>
