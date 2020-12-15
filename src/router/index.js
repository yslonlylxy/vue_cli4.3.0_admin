import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
	// model:'history',
    routes
});

router.beforeEach((to, from, next) => {
	// 记录访问的最后一个页面
	if (from.path !== '/login') {
		localStorage.setItem('from_path', from.path)
	}
	next()
});

export default router
