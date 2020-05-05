import Axios from 'axios'
// import qs from 'qs'

// Axios.defaults.baseURL = "https://www.easy-mock.com/mock/5b56c02734c1d075b3b438b3";
// // Axios.defaults.transformRequest = [data => { return qs.stringify(data) }];
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// Axios.defaults.headers.post['Authorization'] = `Bearer ${window.localStorage.Token}`;
// Axios.defaults.withCredentials = true;

Axios.interceptors.response.use((config) => {
    return config;
  },(error) =>{
    return Promise.resolve(error.response); //返回报错信息 到 .then()里
  });



export default Axios;
