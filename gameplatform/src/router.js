const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/registration',
        meta: {
            title: '用户注册'
        },
        component: (resolve) => require(['./views/registration.vue'], resolve)
    },
    {
        path: '/main',
        meta: {
            title: '用户界面'
        },
        component: (resolve) => require(['./views/main.vue'], resolve),
        children:[
            {
                path: 'userGame',
                meta: {
                    title: '用户游戏管理'
                },
                component: (resolve) => require(['./views/userGame.vue'], resolve)
            },
            {
                path: 'platGame',
                meta: {
                    title: '平台游戏'
                },
                component: (resolve) => require(['./views/platGame.vue'], resolve)
            },
        ]
    },
    {
        path: '/addGame',
        meta: {
            title: '添加游戏'
        },
        component: (resolve) => require(['./views/addGame.vue'], resolve)
    },
    {
        path: '/update',
        meta: {
            title: '修改游戏'
        },
        name:'update',
        params:{},
        component: (resolve) => require(['./views/update.vue'], resolve)
    },
    {
        path: '/changePwd',
        meta: {
            title: '修改密码'
        },
        name:'changePwd',
        params:{},
        component: (resolve) => require(['./views/changePwd.vue'], resolve)
    },
    {
        path: '/changeInfo',
        meta: {
            title: '修改用户信息'
        },
        name:'changeInfo',
        params:{},
        component: (resolve) => require(['./views/changeInfo.vue'], resolve)
    }
];
export default routers;
