<template>
    <div class="login">
        <el-card>
            <div class="logo">
                <div class="title">后台管理后台</div>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="display: flex;justify-content: space-between">
                    <el-button type="primary" @click="logIn" style="margin-left:-50px">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
	export default {
		name: "login",
        data() {
	        let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};
	        let validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{ validator: validatePass, trigger: 'blur' }
					],
					password: [
						{ validator: validatePass2, trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			logIn() {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						this.$axios.post('/log/login',this.ruleForm,
							result => {
							    let data = result.data;
                                if(data.type === 'ok'){
                                    // console.log(data)
	                                sessionStorage.setItem('isLogin','true');
                                    localStorage.setItem('logName', data.username);
                                    localStorage.setItem('log_id', data.id);
                                    
	                                this.$router.replace('/')
                                }else{
	                                this.$message.error(data.msg);
                                }
                            });

					} else {
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
    .login{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url("../assets/background1.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        animation: changeBackGroundImage 30s;
    }
    .title{
        text-align: center;
        padding: 10px 0 20px;
        font-size: 22px;
        font-weight: bold;
    }
    .el-card{
        width: 400px;
        margin: 0 auto;
        position: fixed;
        top: calc(50% - 163px);
        left: calc(50% - 200px);
    }
    .el-form-item:last-child{
        margin-bottom: 0;
    }
</style>