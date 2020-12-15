<template>
  <div class="a_editor">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      <!-- <el-button @click='get'>点击</el-button> -->
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
export default {
    name: 'a_editor',
    data () {
        return {
            editor: ClassicEditor,
            // editorData: this.$store.state.editorData,
            editorConfig: {
                removePlugins: ['MediaEmbed'], //除去视频按钮
                language: 'zh-cn',//中文包
                ckfinder: {
                  'uploaded': 1,
                  'url': '/'
                  // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
                },
                toolbar: [ 
                  'heading',//段落
                  '|',//分隔
                  'bold',//加粗
                  'italic',//倾斜
                  'link', //超链接
                  'bulletedList', //项目列表
                  'numberedList', //编号列表
                  'blockQuote',//块引用
                  'undo', //撤销
                  'redo',//重做
                  'imageStyle:full', //图片通栏显示
                  'imageStyle:side', //图片侧边显示
                  'imageTextAlternative',//更换图片替换文本
                  'imageUpload',//插入图像
                ],//工具栏显示
            },
        }
    },
	computed: {
		editorData: {
			get () {
				return this.$store.state.editorData
			},
			set (value) {
				this.$store.commit('setMsg', value)
			}
		}
	},
	methods: {
      // get(){
      //   this.$store.commit('setMsg',this.editorData);
      //   // console.log(this.$store.state.editorData)
      // }
    },
    // props:{
    //   editordata:''
    // },
}
</script>

<style scoped>
    
</style>