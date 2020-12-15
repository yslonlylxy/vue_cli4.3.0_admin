
const routes = [
	{
		name: 'login',
		path: '/login',
		component: () => import('../views/login'),
		meta: {
			title: '登录'
		}
	}, 
	{ // 主框架
		name: 'main',
		component: () => import('../components/main'),
		path: '/',
		meta: {
			title: '首页',
			requisite:true
		},
		children: [
			{
				name:'home',
				path: '/',
				component: () => import('../views/home'),
				meta: {
					title: '主页',
					requisite:true
				}
			},
			{
				name:'userInfo',
				path: '/info/userInfo',
				component: () => import('../views/userInfo'),
				meta: {
					title: '用户信息',
					requisite:true
				}
				
			},
			{
				name:'roleInfo',
				path: '/info/roleInfo',
				component: () => import('../views/roleInfo'),
				meta: {
					title: '角色信息',
					requisite:true
				}
				
			},
			{
				name:'menuInfo',
				path: '/info/menuInfo',
				component: () => import('../views/menuInfo'),
				meta: {
					title: '菜单信息',
					requisite:true
				}
				
			},
			{
				name:'loginTable',
				path: '/table/loginTable',
				component: () => import('../views/loginTable'),
				meta: {
					title: '登录记录',
					requisite:true
				}
			},
			{
				name:'logoutTable',
				path: '/table/logoutTable',
				component: () => import('../views/logoutTable'),
				meta: {
					title: '退出记录',
					requisite:true
				}
			},
			{
				name:'commentTable',
				path: '/comment/check',
				component: () => import('../views/commentCheck'),
				meta: {
					title: '评论审核',
					requisite:true
				}
			},
			{
				name:'articlelist',
				path:'/article/articlelist',
				component: () => import('../views/articlelist'),
				meta: {
					title:'文章列表',
					requisite:true
				}
			},
			{
				name:'articleupload',
				path:'/article/upload',
				component:() => import('../views/upload'),
				meta:{
					title:'文章上传',
					requisite:true
				}
			},
			{
				name:'articlereview',
				path:'/article/review',
				component:() => import('../views/review'),
				meta:{
					title:'文章审核',
					requisite:true
				}
			},
			{
				name:'articleEditor',
				path:'/article/editor',
				component:() => import('../views/articleEditor'),
				meta:{
					title:'文章编辑',
					requisite:true
				}
			},
			{
				name:'webset',
				path:'web/webset',
				component:() => import('../views/webset'),
				meta:{
					title:'网站设置',
					requisite:true
				}
			}
		]
	},
	{
		name: '404错误页面',
		path: '/404',
		component: () => import('../views/404')
	},
	{path: '*', redirect: '/404'}
];

export default routes