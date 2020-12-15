<template>
    <div id="userInfo">
        
        <el-card>
            <el-row type="flex" justify="end">
                <el-button @click="dialogVisible = true">新增用户</el-button>
            </el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%;margin-top: 20px"
                    border
                    @selection-change="handleSelectionChange">
                <el-table-column
                        prop="username"
                        label="登录账户"
                        width="280"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="user"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="phoneNumber"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="handle"
                    label="角色分配"
                    width="180"
                    align="center">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.name" @change="handleEdit(scope.row.id,scope.row.name)" placeholder="请选择">
                            <el-option
                                v-for="item in roleData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                    <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input show-password type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input type="text" maxlength="11" v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertUser">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog
            title="修改用户角色"
            :visible.sync="changeRoleDialogVisible"
            width="30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                    <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input show-password type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input type="text" maxlength="11" v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	export default {
		name: "userInfo",
        data(){
            let validateUser = (rule, value, callback) => {
                !value ? callback(new Error('账号不能为空')) : callback()
			};
	        let validatePass2 = (rule, value, callback) => {
                !value ? callback(new Error('密码不能为空')) : callback()
            };
            let validateEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

                !value ? callback(new Error('邮箱不能为空'))
                : setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
			};
	        let validatePN = (rule, value, callback) => {
                const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
                !value ? callback(new Error('电话号码不能为空'))
                : setTimeout(() => {
                    if (!Number.isInteger(+value)) {
                        callback(new Error('请输入纯数字'))
                    } else {
                        if (phoneReg.test(value)) {
                        callback()
                        } else {
                        callback(new Error('电话号码格式不正确'))
                        }
                    }
                }, 100)
			};
			return{
				tableData:[],
				multipleSelection:'',
                dialogVisible:false,
                changeRoleDialogVisible:false,
				registerData: {
					username: '',
					password: '',
					logCode:'',
					remark:""
                },
                roleData:[],
                ruleForm: {
                    username: '',
                    user: '',
                    password: '',
                    email: '',
                    phoneNumber: ''
				},
                rules: {
					username: [
						{ required: true, validator: validateUser, trigger: 'blur' }
					],
					password: [
						{ required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
						{ required: true, validator: validateEmail, trigger: 'blur' }
					],
					phoneNumber: [
						{ required: true, validator: validatePN, trigger: 'blur' }
					]
				}
            }
        },
        created(){
	       this.query();
        },
        methods:{
			query(){
				this.$axios.get('/log/getAllInfo', null,
					result => {
                        this.tableData = result.data.data;
                    });
                this.$axios.get('/log/getAllRoleInfo', null,
					result => {
                        this.roleData = result.data.data
                        // console.log(this.roleData)
					});
            },
	        handleSelectionChange(val) {
		        this.multipleSelection = val;
		        this.showDel = this.multipleSelection.length > 0;
            },
            insertUser(){
                this.$axios.post('/log/insertUser', this.ruleForm,
					result => {
                        let data = result.data
                        data.status == 500
                        ? this.$message.error(data.msg)
						: this.$message({
                            message: data.msg,
                            type: 'success'
                        }),this.dialogVisible=false,this.$refs['ruleForm'].resetFields(),this.query();
					});
            },
            handleEdit(u_id,r_name){                
                let r_id = this.roleData.filter(item=>{
                    return item.name == r_name
                })[0].id

                this.$axios.post('/log/editUser_Role', {
                    u_id,r_id
                },result => {
                        let data = result.data
                        data.status == 500
                        ? this.$message.error(data.msg)
						: this.$message({
                            message: data.msg,
                            type: 'success'
                        }),this.query();
					});
            }
        }

	}
</script>

<style scoped>

</style>