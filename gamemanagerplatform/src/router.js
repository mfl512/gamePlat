const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/main',
        meta: {
            title: '管理界面'
        },
        component: (resolve) => require(['./views/main.vue'], resolve),
        children:[
            {
                path: 'gameManager',
                meta: {
                    title: '审查通过游戏'
                },
                component: (resolve) => require(['./views/gameManager.vue'], resolve)
            },
            {
                path: 'gameManager2',
                meta: {
                    title: '审查不通过游戏'
                },
                component: (resolve) => require(['./views/gameManager2.vue'], resolve)
            },{
                path: 'checkGame',
                meta: {
                    title: '游戏审查管理'
                },
                component: (resolve) => require(['./views/checkGame.vue'], resolve)
            }
        ]
    },
    {
        path: '/changePwd',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/changePwd.vue'], resolve)
    },
];
export default routers;
