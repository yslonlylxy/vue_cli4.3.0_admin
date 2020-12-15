import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import Api from './plugins/axios.js';
import CKEditor from '@ckeditor/ckeditor5-vue';


Vue.prototype.$axios = Api;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // console.log(1,sessionStorage.getItem('menu'))
  let menu = []
  sessionStorage.getItem('menu') !== "undefined" ? menu = JSON.parse(sessionStorage.getItem('menu')) : next('/login')
  /* 页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  if(sessionStorage.getItem('isLogin') === 'true'){
    if (!deepQuery(menu,to.path)) {
      next('/404')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
        next()
    } else {
      next('/login')
    }
  }
  
});

function deepQuery(tree, path) {
  let isRight = false
  if(path === '/' || path === '/404' || path === '/login') return true

  for(let i = 0;i < tree.length;i++){
      if(tree[i].children && tree[i].children.length > 0) {
          for(let j = 0; j<tree[i].children.length; j++) {
              if(tree[i].children[j].url == path){
                  isRight = true
                  return isRight;
              }
          }
      }
  }
  if(!isRight){
      return false
  }
}

Vue.use(Element);
Vue.use( CKEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
