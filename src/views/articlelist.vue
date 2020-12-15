<template>
    <div class="list">
        <el-table
        :data="articlelist.filter(data => !page.selectTitle || data.title.toLowerCase().includes(page.selectTitle.toLowerCase()))"
        style="width: 100%"
        stripe
        border>
        <el-table-column label="id" prop="id" width="50" align="center"></el-table-column>
        <el-table-column label="文章标题" prop="title" width='auto' align="center"></el-table-column>
        <el-table-column label="作者" prop="author" width="150" align="center"></el-table-column>
<!--        <el-table-column label="状态" width="100" align="center">-->
<!--            <template slot-scope="scope">-->
<!--                        {{scope.row.status === "1" ? "已审核" : "未审核"}}-->
<!--                    </template>-->
<!--        </el-table-column>-->
        <el-table-column label="上传时间" prop="datetime" width="180" align="center"></el-table-column>
<!--        <el-table-column align="right" width='250'>-->
<!--            <template slot="header" slot-scope="scope">-->
<!--                <el-input v-model="page.selectTitle" size="mini" placeholder="输入关键字搜索"  @input="query" />-->
<!--            </template>-->
<!--            <template slot-scope="scope">-->
<!--                <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>-->
<!--                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--            </template>-->
<!--        </el-table-column>-->
        </el-table>
<!--        <div class="block">-->
<!--            <el-pagination-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="page.currentPage"-->
<!--                :page-size="page.limit"-->
<!--                background-->
<!--                small-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="page.total">-->
<!--            </el-pagination>-->
<!--        </div>-->
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
                selectTitle:''
            }
        };
    },
    methods: {
        handleEdit(id) {
            this.$router.push({
                path:'/article/editor',
                query:{
                    id:id
                }
            })
            // console.log(index, row);
        },
        handleDelete(id) {
            let ids = [];
            ids.push(id);
            this.$axios.delete('/article/delete',{ids:JSON.stringify(ids)},
                result => {
                    if(result.data.code === 200){
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
            this.$axios.get('/api/getArticleList',this.page,
                result => {
                    if(result.data.status === 200){
                        this.articlelist = result.data.data;
                        // this.page.total = result.data.total;
                    }else{
                        this.$message.error(result.data.msg)
                    }
                    // console.log(result)
                })
        },
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