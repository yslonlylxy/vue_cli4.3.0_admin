<template>
    <div id="tabs">
        <el-tabs v-model="tab"  type="border-card"  @tab-remove="removeTab" @tab-click="selectTab">
            <el-tab-pane
                    :closable="tabList.length !== 1"
                    :key="item.name"
                    v-for="item in tabList"
                    :label="item.displayName"
                    :name="item.name">
            </el-tab-pane>
            <router-view v-if="isRouterAlive" />
        </el-tabs>
        <el-button class="el-icon-refresh refresh" @click="reload">刷新</el-button>
    </div>
</template>

<script>
	export default {
		name: "tabs",
		data () {
			return {
				tab: '',
                isRouterAlive:true
			};
		},
        computed: {
			tabList () {
				return this.$store.state.tabList;
			},
			activeTab () {
				return this.$store.state.activeTab;
			}
		},
        provide(){
		    return{
		    	reload:this.reload
            }
        },
		methods: {
			removeTab (targetName) {
				let activeName = this.tab;
				if (activeName === targetName) {
					this.tabList.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = this.tabList[index + 1] || this.tabList[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					})
				}
				this.tab = activeName;
				let tab = this.$store.state.tabList.filter((item) => {
					return item.name === targetName;
				});
				this.$store.commit('delTabs', tab[0]);

				if (this.tabList.length === 0) {
					this.$router.push({
						path: '/'
					})
				} else {
					this.$router.push({
						name: this.tab
					})
				}
				this.$store.commit('activeTabs', this.tab)
			},
			selectTab(tab) {
				this.$store.commit('activeTabs', tab.name);
				this.$router.push({
					name: tab.name
				})
			},
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function () {
	                this.isRouterAlive = true;
                })
            }
		},
		watch: {
			activeTab: {
				deep: true,
				immediate: true,
				handler (val) {
					this.tab = val;
					this.$store.commit('activeTabs', val)
				}
			},
			$route: {
				deep: true,
				immediate: true,
				handler (val) {
					this.$store.commit('activeTabs', val.name)
				}
			}
		}
	}
</script>

<style lang="less">
    #tabs {
        position: absolute;
        left: 220px;
        top: 60px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background: none repeat scroll 0 0 #fff;
        .el-tabs--border-card{
            border: none;
            box-shadow: none;
        }
        .refresh{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
</style>