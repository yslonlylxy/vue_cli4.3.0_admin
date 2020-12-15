<template>
    <div id="roleInfo">
        <el-card>
            <el-button @click='showMenu()'>
               新增角色
           </el-button>
            <el-table
                    :data="roleData"
                    style="width: 100%;margin-top: 20px"
                    border>
                <el-table-column
                        prop="name"
                        label="角色名称"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column label="角色状态" width="180" align="center">
                    <template  slot-scope="scope">
                        <el-tag v-if="scope.row.status == '1'" type="success">开启</el-tag>
                        <el-tag v-else type="danger">关闭</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
                <el-table-column
                    prop="handle"
                    label="操作"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            :title="type =='edit' ? '编辑角色' : '新增角色'"
            :visible.sync="dialogVisible"
            width="50%">
            <el-card>
                <el-row>
                    <el-col :span="12">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="角色名称" prop="name">
                                <el-input :disabled="type =='edit' ? true : false" type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label='角色状态' prop='status' v-show="type =='edit' ? true : false">
                                <el-switch
                                    v-model='ruleForm.status'
                                    active-value='1'
                                    inactive-value='2'
                                    active-color="#2a8f57"
                                    inactive-color="#d80101">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" :rows="5" v-model="ruleForm.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <el-tree
                            ref="tree"
                            :data="menuList"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :default-checked-keys="defaultChecked"
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                        </el-tree>
                    </el-col>
                </el-row>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="type =='edit' ? editRole() : insertRole()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	export default {
		name: "roleInfo",
        data() {
            let validateName = (rule, value, callback) => {
                !value ? callback(new Error('角色名称不能为空')) : callback()
			};
            return {
                roleData: [],
                menuList: [],
                defaultProps: {
                    children: 'children',
                    label: 'displayName'
                },
                dialogVisible: false,
                type:'insert',
                ruleForm: {
                    name: '',
                    remark: '',
                    status: '1',
                    checkList:[],
                    checkAllList:[]
                },
                defaultChecked:[16],
                rules: {
					name: [
						{ required: true, validator: validateName, trigger: 'blur' }
					]
				}
            }
        },
        created() {
	       this.query();
        },
        methods:{
            query(){
				this.$axios.get('/log/getAllRoleInfo', null,
					result => {
						this.roleData = result.data.data
                    });
                this.$axios.get('/log/getAllMenuInfo', null,
					result => {
						this.menuList = result.data.data
                    });
                
            },
            showMenu(id){
                this.type = 'insert';
                this.dialogVisible = true;

                this.defaultChecked = [this.menuList[0].id]

                !id ? this.ruleForm = {}
                : this.type = 'edit',this.$axios.get('/log/getRole_Menu', {id},
					result => {
                        this.defaultChecked = [];
                        result.data.data.forEach(item => {
                            this.defaultChecked.push(item.menu_id)
                        })
                        this.$nextTick(() => {
                           this.$refs.tree.setCheckedKeys(this.defaultChecked);//获取已经设置的资源后渲染
                        });
                    })
            },
            insertRole() {
                console.log(this.ruleForm)
                this.$axios.post('/log/insertRole', this.ruleForm,
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
            handleCheckChange () {
                let res = this.$refs.tree.getCheckedNodes()
                let arr = []
                res.forEach((item) => {
                    arr.push(item.id)
                })
                this.ruleForm.checkList = arr
                this.ruleForm.checkAllList = [...this.ruleForm.checkList,...this.$refs.tree.getHalfCheckedKeys()]
            },
            handleDelete(rowId) {
                this.$axios.post('/log/deleteRole', {id:rowId},
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
            handleEdit(row) {
                this.ruleForm = row
                this.showMenu(row.id)
            },
            editRole(){
                this.ruleForm.checkList == this.defaultChecked 
                ? this.ruleForm.checkList = this.defaultChecked
                : this.ruleForm.checkList = this.ruleForm.checkList

                this.ruleForm.checkAllList = [...this.ruleForm.checkList,...this.$refs.tree.getHalfCheckedKeys()]

                this.$axios.post('/log/editRole', this.ruleForm,
					result => {
                        let data = result.data
                        data.status == 500
                        ? this.$message.error(data.msg)
						: this.$message({
                            message: data.msg,
                            type: 'success'
                        }),this.dialogVisible=false,this.$refs['ruleForm'].resetFields(),this.query();;
					});
            }
        }
	}
</script>

<style scoped>

</style>