<template>
    <div class="reviews">
        <el-card>
            <el-table :data='articleList'
                      style="width: 100%"
                      stripe
                      border>
                <el-table-column label="文章标题" prop="title" width="auto"></el-table-column>
                <el-table-column label="作者" prop="author" width="200" align="center"></el-table-column>
                <el-table-column label="原创" width="100" align="center">
                    <template slot-scope="scope">
                        {{scope.row.original === 1 ? "是" : "否"}}
                    </template>
                </el-table-column>
                <el-table-column label="上传时间" prop="date" width="180" align="center"></el-table-column>
                <el-table-column label="审核" width="130" align="center">
                    <template  slot-scope="scope">
                        <el-switch
                                v-model='scope.row.status'
                                active-value='1'
                                inactive-value='2'
                                active-color="#2a8f57"
                                inactive-color="#d80101"
                                @change=changeRowStatus(scope.row.status,scope.row.id)>
                        </el-switch>
                    </template>

                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-size="page.limit"
                        :page-sizes="[5, 10, 20, 30]"
                        background
                        small
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </div>
        </el-card>
        <div ref="intervalTime" v-show="false"></div>
    </div>
</template>

<script>
	export default {
        name: "reviews",
        data() {
            return {
                articleList: [],
	            page: {
		            limit: 5,
		            currentPage: 1,
		            total: 10
	            },
                index:1
            };
        },
        created(){
            this.query()
        },
        methods: {
        	query(){
		        this.articleList = [];
		        this.$axios.get('/article/getCheckArticle', this.page,
			        result => {
				        if(result.data.code === 200){
					        this.articleList = result.data.data;
                            this.page.total = result.data.total;
				        }else{
					        this.$message.error(result.data.msg);
                        }
                        // console.log(result)
			        });
            },
            handleSizeChange(val) {
	            this.page.limit = val;
	            this.query()
            },
            handleCurrentChange(val) {
                this.page.currentPage = val;
	            this.query()
            },
	        changeRowStatus(status,id){
		        let params = {
			        status,
			        id
		        };
                this.$axios.put('/article/changeStatus', params,
				    result => {
					    if(result.data.code === 200){
						    this.$message.success(result.data.msg);
                        }else{
                            this.$message.error(result.data.msg);
                        }
                    });
	        }
        },  
	}
</script>

<style scoped>
    .el-pagination{
        text-align: right;
        margin-top: 20px;
    }
</style>