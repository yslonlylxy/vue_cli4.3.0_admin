<template>
  <div id="menu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#2e363f"
      text-color="#a7b1c2"
      :unique-opened="true"
      :router="true"
      :collapse="isCollapse"
      active-text-color="#fff"
    >
      <el-menu-item @click="selectMenu(item)"
        v-for="(item, index) in menuList"
        :key='"1"+index'
        v-show="!item.children"
        :index="item.url"
        
      >
        <i :class="item.icon"></i>
        {{item.displayName}}
      </el-menu-item>
      <el-submenu v-show="item.children" :index="item.url" v-for="(item, index) in menuList" 
        :key='"2"+index'>
        <template slot="title">
          <i :class="item.icon"></i>
          {{item.displayName}}
        </template>
        <el-menu-item
          @click="selectMenu(item1)"
          v-show="!item1.children"
          :index="item1.url"
          v-for="(item1, index) in item.children"
          :key='"3"+index'
        >{{item1.displayName}}</el-menu-item>
        <el-submenu
          v-show="item1.children"
          :index="item1.url"
          v-for="(item1, index) in item.children"
          :key='"4"+index'
        >
          <template slot="title">{{item1.displayName}}</template>
          <el-menu-item
            @click="selectMenu(item2)"
            v-for="(item2, index2) in item1.children"
            :key='"5"+index2'
            :index="item2.url"
          >{{item2.displayName}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList:[]
    };
  },
  // computed: {
  //   menuList() {
  //     return this.$store.state.menuList;
  //   },
  // },
  created(){
    let id = localStorage.getItem('log_id')
    
    this.$axios.get('/log/getUser_menu', {id},
					result => {
            // console.log(result.data.data)
            this.menuList = result.data.data
            sessionStorage.setItem('menu',JSON.stringify(this.menuList))
					});
  },
  methods: {
    selectMenu(menu) {
      this.$store.commit("pushTabs", menu);
    },
    showMenu(){
      console.log(this.menuList)
    }
  },
};
</script>

<style lang="less">
#menu {
  position: absolute;
  left: 0;
  top: 60px;
  width: 220px;
  bottom: 0;
  background: #2e363f;
  .el-menu {
    border-right: none;
  }
  .el-menu-item.is-active {
    border-left: 5px solid #a7b1c2;
    background-color: #262e37 !important;
  }
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: #262e37 !important;
  }
}
</style>
