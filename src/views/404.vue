<template>
    <!-- <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
      <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      </div>
  </div> -->
  <div id="error404">
        <h2 class="errorHeader"> <b>404错误！抱歉您要找的页面不存在</b> </h2>
        <div class="image">
            <div class="float-left">
                <img src="https://www.withxy.com:1242/images/ds-1.gif" alt>
                <div class="alert"> 卧槽！页面不见了！ </div>
            </div>
            <div class="float-right">
                <img src="https://www.withxy.com:1242/images/ds-2.png" alt style="width:260px;">
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        name: "error404",
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        }
	}
</script>

<style scoped>
    #error404{
	        width: 1200px;
	        height: 130px;
	        margin: 200px auto;
	        border: solid 1px #ddd;
	        border-radius: 4px;
	        position: relative;
	        box-sizing: border-box;
	    }
	    .image{
	        width: 1200px;
	        display: flex;
	        justify-content: space-between;
	        position: absolute;
	        top: 40px;
	    }
	    .alert{
	        border-radius: 5px;
	        padding: 15px;
	        border: solid 1px #ddd;
	        background-color: #f5f5f5;
	        text-align: center;
	    }
	    .errorHeader{
	        text-align: center;
	        line-height: 130px;
	        margin: 0;
	    }
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #2d8cf0;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>