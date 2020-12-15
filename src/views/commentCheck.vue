<template>
    <div class="list">
        <el-table
                :data="articlelist"
                style="width: 100%"
                stripe
                border>
            <el-table-column label="Id" prop="id" width="50" align="center"></el-table-column>
            <el-table-column label="文章名称" prop="title" width='auto'></el-table-column>
            <el-table-column label="评论昵称" prop="uname" width="150" align="center"></el-table-column>
            <el-table-column label="评论邮箱" prop="email" width="120" align="center"></el-table-column>
            <el-table-column label="评论时间" prop="dateTime" width="180" align="center"></el-table-column>
            <el-table-column label="评论IP" prop="ip" width="200" align="center"></el-table-column>
            <el-table-column label="评论地点" prop="city" width="180" align="center"></el-table-column>
            <el-table-column label="评论内容" prop="comment" width="auto"></el-table-column>
            <el-table-column label="审核状态" width="130" align="center">
                <template  slot-scope="scope">
                    <el-switch
                            v-model='scope.row.status'
                            active-value='1'
                            inactive-value='2'
                            active-color="#2a8f57"
                            inactive-color="#d80101"
                            @change="changeRowStatus(scope.row.status,scope.row.id)">
                    </el-switch>
                </template>

            </el-table-column>
            <el-table-column label="操作"  align="center" width='80'>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-size="page.limit"
                    background
                    small
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
	export default {
		name: "list",
		data() {
			return {
				articlelist: [],
				search: "",
				page:{
					limit:10,
					total:10,
					currentPage: 1,
				}
			};
		},
		methods: {
			handleDelete(id) {
				let ids = [];
				ids.push(id);
				this.$axios.delete('/api/delete',{ids:JSON.stringify(ids)},
					result => {
						if(result.data.status === 200){
							this.$message.success(result.data.msg);
							this.query()
						}else{
							this.$message.error(result.data.msg)
						}
					}
				)
			},
			handleSizeChange(val) {
				this.page.limit = val;
				this.query()
			},
			handleCurrentChange(val) {
				this.page.currentPage = val;
				this.query()
			},
			query(){
				this.$axios.get('/api/allComment',this.page,
					result => {
						if(result.data.status === 200){
							this.articlelist = result.data.data;
							this.page.total = result.data.total;
						}else{
							this.$message.error(result.data.msg)
						}
						// console.log(result)
					})
			},
			changeRowStatus(status,id){
				let params = {
					status,
					id
				};
				this.$axios.put('/api/changeStatus', params,
					result => {
						if(result.data.status === 200){
							this.$message.success(result.data.msg);
						}else{
							this.$message.error(result.data.msg);
						}
					});
			}
		},
		created() {
			this.query()
		},
	};
</script>

<style lang='less'>
    .el-pagination{
        text-align: right;
        margin-top: 20px;
    }
</style>