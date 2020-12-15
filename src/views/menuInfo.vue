<template>
    <div id="menuInfo">
       <el-card>
           <el-button @click='showInsert(0)'>
               新增节点
           </el-button>
            <el-table
                :data="menuData"
                row-key="id"
                style="width: 100%;margin-top: 20px"
                border                
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
            <el-table-column
                prop="name"
                label="路由名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="displayName"
                label="菜单名称"
                width="180"
                align="center">
            </el-table-column>
            <el-table-column
                prop="icon"
                label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" style="margin-right:5px"></i>{{scope.row.icon}}
                </template>
            </el-table-column>
            <el-table-column
                prop="url"
                label="菜单URL"
                width="380">
            </el-table-column>
            <el-table-column
                prop="handle"
                label="操作"
                width="380"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.level == 1"
                        size="mini"
                        @click="showInsert(scope.row.id)">新增子节点</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        v-show="false"
                        @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       </el-card>
       <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="路由名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="displayName">
                    <el-input type="text" v-model="ruleForm.displayName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单地址" prop="url">
                    <el-input type="text" v-model="ruleForm.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input type="text" v-model="ruleForm.icon" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertMenu">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	export default {
        name: "menuInfo",
        data() {
            let validateName = (rule, value, callback) => {
                !value ? callback(new Error('路由名称不能为空')) : callback()
			};
	        let validateDN = (rule, value, callback) => {
                !value ? callback(new Error('菜单名称不能为空')) : callback()
            };
            let validateURL = (rule, value, callback) => {
                !value ? callback(new Error('菜单地址不能为空')) : callback()
			};
            return {
                menuData: [],
                dialogVisible:false,
                ruleForm: {
                    name: '',
                    displayName: '',
                    url: '',
                    icon: '',
                    pId: 0
				},
                rules: {
					name: [
						{ required: true, validator: validateName, trigger: 'blur' }
					],
					displayName: [
						{ required: true, validator: validateDN, trigger: 'blur' }
                    ],
                    url: [
						{ required: true, validator: validateURL, trigger: 'blur' }
					]
				}
            }
        },
        created() {
	       this.query();
        },
        methods:{
            query(){
				this.$axios.get('/log/getAllMenuInfo', null,
					result => {
						this.menuData = result.data.data
					});
            },
            showInsert(pId) {
                this.dialogVisible = true
                this.ruleForm.pId = pId
            },
            insertMenu() {
                // console.log(this.ruleForm)
                this.$axios.post('/log/insertMenu', this.ruleForm,
					result => {
                        let data = result.data
                        data.status == 500
                        ? this.$message.error(data.msg)
						: this.$message({
                            message: data.msg,
                            type: 'success'
                        }),this.dialogVisible=false,this.$refs['ruleForm'].resetFields(),this.query();;
					});
            },
            handleDelete(rowId) {
                this.$axios.post('/log/deleteMenu', {id:rowId},
					result => {
                        let data = result.data
                        data.status == 500
                        ? this.$message.error(data.msg)
						: this.$message({
                            message: data.msg,
                            type: 'success'
                        }),this.query();;
					});
            },
            handleEdit(rowId) {
                console.log(rowId)
            }
        }
	}
</script>

<style scoped>

</style>