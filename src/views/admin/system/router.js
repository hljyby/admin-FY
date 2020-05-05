export default [{
        path: '/',
        redirect: '/usermanagement'
    },
    {
        path: '/ordinaryBasicInformationManagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./ordinarybasic/SysAppList.vue'], resolve),
            meta: {
                title: '普通干线省级出入口基础信息管理'
            }
        }]
    },
    {
        path: '/ordinaryStatisticsInformationManagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./ordinaryStatistics/SysExceptionLogList.vue'], resolve),
            meta: {
                title: '普通干线省级出入口统计信息管理'
            }
        }]
    },
    {
        path: '/allBasicInformationManagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./allbasic/SysAppList.vue'], resolve),
            meta: {
                title: '省级出入口基础信息管理'
            }
        }]
    },
    {
        path: '/allStatisticsInformationManagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./allStatistics/SysExceptionLogList.vue'], resolve),
            meta: {
                title: '省级出入口统计信息管理'
            }
        }]
    },
    {
        path: '/usermanagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./user/UserManagement.vue'], resolve),
            meta: {
                title: '用户管理'
            }
        }]
    },
    {
        path: '/companymanagement',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children: [{
            path: '',
            component: resolve => require(['./company/CompanyManagement.vue'], resolve),
            meta: {
                title: '单位管理'
            }
        }]
    }
]