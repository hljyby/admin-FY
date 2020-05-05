export default [
    {
        path:'/login',
        component:resolve => require(['./Login.vue'],resolve),
        meta:{title:'登录页'}
    }
]
