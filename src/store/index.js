import Vue from 'vue'
import Vuex from 'vuex'
import menuList from '../mock/menuList';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		menuList,
		isLogin:false,
		tabList: JSON.parse(sessionStorage.getItem('admin_tabs')) || [menuList[0]], // tab列表
		activeTab: sessionStorage.getItem('admin_activeTab') || 'home', // 激活tab
		editorData:'',
	},
	mutations: {
		pushTabs(state,tab){
			state.activeTab = tab.name;
			sessionStorage.setItem('admin_activeTab', state.activeTab);
			if (state.tabList.length > 0) {
				if (state.tabList.filter((item) => item.name === tab.name).length === 0) {
					state.tabList.push(tab)
				}
			} else {
				state.tabList.push(tab)
			}
			sessionStorage.setItem('admin_tabs', JSON.stringify(state.tabList))
		},
		delTabs(state,tab){
			state.tabList = state.tabList.filter((item) => {
				return item.url !== tab.url
			});
			sessionStorage.setItem('admin_tabs', JSON.stringify(state.tabList))
		},
		activeTabs(state,tab){
			state.activeTab = tab;
			sessionStorage.setItem('admin_activeTab', state.activeTab)
		},
		setMsg(state,val){
			state.editorData = val
		}
	},
	actions: {
	},
	modules: {
	}
})
