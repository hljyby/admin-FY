// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import '@babel/polyfill';
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './config/router.js'
import Axios from './config/axios'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$ajax = Axios;

Vue.prototype.$post = function (url,data = {}){
  let _this = this
  return Axios.post(`${url}`,data).then(res=>{
    if(res.status == 401 && res.data.Message === "已拒绝为此请求授权。"){
      _this.$notify({
        title: "登录超时请重新登陆",
        type: "warning"
      });
    // setTimeout(() => {
    //         _this.$router.push('/login')
    // }, 1000);
    }
    return res
  }).catch(err=>{
    console.log(err)
  })
  
}

// var excludeRoute = ['/login']
// router.beforeEach((to, from, next) => {
//   if (excludeRoute.findIndex(v => v === to.path) < 0) {
//     //以下为验证条件
//     var ID = window.localStorage.ID;
//     var DLXM = window.localStorage.DLXM;

//     if (!ID || !DLXM) {
//       next({
//         path: "/login"
//       })
//       return
//     }
//   }
//   next();
// });


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')