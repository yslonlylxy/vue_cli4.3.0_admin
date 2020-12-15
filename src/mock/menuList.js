let menuList = [
	{
        name: 'home',
        displayName: '首页',
        url: '/',
        icon: 'el-icon-menu'
    },
    /*用户管理*/
    {
        name: 'info',
        displayName: '用户管理',
        url: '/info',
        icon: 'el-icon-s-custom',
        children: [
            {
                name: 'userInfo',
                displayName: '用户信息',
                url: '/info/userInfo'
            },
            {
                name: 'roleInfo',
                displayName: '角色信息',
                url: '/info/roleInfo'
            },
            {
                name: 'menuInfo',
                displayName: '菜单信息',
                url: '/info/menuInfo'
            }
        ]
    },
    
    /*后台管理*/
    {
        name: 'table',
        displayName: '后台管理',
        url: '/table',
        icon: 'el-icon-setting',
        children: [
            // {
            //     name: 'loginTable',
            //     displayName: '登录表格',
            //     url: '/table/loginTable'
            // },
            // {
            //     name: 'logoutTable',
            //     displayName: '退出表格',
            //     url: '/table/logoutTable'
            // },
            {
                name:'articlelist',
                displayName:'文章列表',
                url:'/article/articlelist'
            },
            {
                name: 'commentTable',
                displayName: '评论审核',
                url: '/comment/check'
            }
        ]
    },
    // 文章管理
    // {
    //     name:'article',
    //     displayName:'文章管理',
    //     url:'/article',
    //     icon:'el-icon-tickets',
    //     children:[
    //         {
    //             name:'articlelist',
    //             displayName:'文章列表',
    //             url:'/article/articlelist'
    //         },
    //         {
    //             name:'articleupload',
    //             displayName:'文章上传',
    //             url:'/article/upload'
    //         },
    //         {
    //             name:'articlereview',
    //             displayName:'文章审核',
    //             url:'/article/review'
    //         }
    //     ]
    // },
    //网站设置
    // {
    //     name:'web',
    //     displayName:'网站设置',
    //     url:'/web',
    //     icon:'el-icon-s-fold',
    //     children:[
    //         {
    //             name:'webset',
    //             displayName:'前端页面设置',
    //             url:'/web/webset'
    //         }
    //     ]
    // }
];

export default menuList
