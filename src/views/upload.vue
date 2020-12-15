<template>
    <div class="upload">
        <el-form :rules="rules" label-width='95px' ref="articleForm" :model="articleForm">
            <el-form-item label="文章标题：" prop="title">
                <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="发布时间：" prop="date">
                <el-date-picker v-model="articleForm.date" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否原创：" prop="original">
                <el-radio-group v-model="articleForm.original">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文章作者：" prop="author">
                <el-input v-model="articleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="文章分类：" prop="kind">
                <el-select v-model="articleForm.kind" placeholder="请选择文章分类">
                    <el-option label="技术分享" value="1"></el-option>
                    <el-option label="成长历程" value="2"></el-option>
                    <el-option label="关于我们" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章简介：" prop="intro">
                <el-input type="textarea" v-model="articleForm.intro" placeholder="请输入内容" maxlength="150" show-word-limit></el-input>
            </el-form-item>
            <div class="upload_model">
                <label for="">请添加封面图：</label>
                <el-upload class="avatar-uploader"
                           ref="upload"
                           action="http://47.102.147.30:1241/article/upload"
                           :auto-upload="false"
                           :show-file-list="false"
                           :on-change="handleChange"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                    <img v-if="articleForm.imageUrl" :src="articleForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="upload_model">
                <label for="">请输入文章内容：</label>
                <x-editor style="width:700px;" v-model="articleForm.content"></x-editor>
            </div>
            <div class="upload_model put_form">
                <el-button type="primary" @click="submitForm('articleForm')">立即提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import xEditor from '../components/ckeditor.vue';
	export default {
		components:{
			XEditor:xEditor
        },
        name: "upload",
        data(){
            return{
                articleForm:{
	                original:'1',//是否原创
                    imageUrl:'',//文章封面图用于显示
	                cover:'',//文章封面图
                    title:'',//文章标题
                    date:'',//上传时间
	                intro:'',//文章简介
                    author:'',//文章作者
                    content:'',//文章内容
                    kind:''//文章分类
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },
                rules:{
                    title:[
                        {required: true, message: '请输入文章标题', trigger: 'blur'}
                    ],
                    date:[
                        {required: true, message: '请选择发布时间', trigger: 'blur'}
                    ],
	                original: [
                        { required: true, message: '请选择是否原创', trigger: 'change' }
                    ],
                    author:[
                        {required: true, message: '请输入文章作者', trigger: 'blur'}
                    ],
                    kind: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    intro:[
                        {required: true, message: '请输入文章简介', trigger: 'blur'}
                    ]
                },
	            uploadImageList:[]
            }
        },
        methods: {
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传封面图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传封面图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitForm(formName) { 
                this.articleForm.content = this.$store.state.editorData;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	if(this.articleForm.imageUrl){
                            this.$refs.upload.submit();    
                        }else{
		                    this.$message.error("请添加封面图后再进行提交！");
                        }
                    } else {
                        return false;
                    }
                });
            },
	        handleChange(file) {
            	if(file){
		            this.articleForm.imageUrl = URL.createObjectURL(file.raw);
                }
	        },
	        handleRemove(file,fileList){
		        return false
	        },
	        handleAvatarSuccess(res, file) {
                if(res.flag){
                    this.articleForm.cover = this.articleForm.imageUrl = res.site;
		            this.$axios.post('/article/issue', this.articleForm,
			        result => {
                        if(result.data.code === 200){
                            this.$message.success(result.data.msg);
                            this.$refs['articleForm'].resetFields();
	                        let menu = this.$store.state.menuList[3].children[2];
	                        this.$store.commit("pushTabs", menu);
	                        this.$router.push({
		                        path:menu.url
	                        })
                        }else{
                            this.$message.error(result.data.msg);
                        }
                    });
                }  
            },
        }
	}
</script>

<style scoped>
    .upload{
        width: 800px;
        margin: 0 auto;
    }
    .el-input{
        width: 300px;
        /* margin-left: 30px; */
    }
    .el-textarea{
        width: 500px;
    }
    .upload_model{
        min-height: 40px;
        line-height: 40px;
        margin-top: 20px;
    }
    .put_form{
        margin-top: 20px;
        width: 700px;
        text-align: center;
    }
    .avatar-uploader .el-upload{
        border: 1px solid #000000;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>