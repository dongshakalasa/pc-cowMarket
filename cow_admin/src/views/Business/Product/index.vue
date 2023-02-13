<style>
.rate {
    color: #669bc9;
    cursor: pointer;
}
</style>
<template>
    <div>
        <!-- 分类 -->
        <el-card>
            <div style="display: flex;">
                <div style="width: 180px; ">
                    <el-input placeholder="根据产品名称搜索" v-model="input">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
                <div style="margin-left: 10px">
                    <el-button icon="el-icon-search" circle></el-button>
                </div>
            </div>
        </el-card>

        <!-- 公告 -->
        <el-card style="margin-top: 30px">
            <!-- 按钮 -->
            <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>
            <el-table style="width: 100%" border :data="goods">
                <el-table-column label="序号" width="80px" align="center" type="index">
                </el-table-column>
                <el-table-column label="默认图片" align="center" width="200">
                    <template slot-scope="{row}">
                        <img :src="row.gs_img" alt="" style="width:80px;height:80px">
                    </template>
                </el-table-column>
                <el-table-column prop="gs_name" label="产品名称" width="150"></el-table-column>
                <el-table-column prop="gs_text" label="产品介绍" width="350"></el-table-column>
                <el-table-column prop="gs_weight" label="重量(g)" width="100"></el-table-column>
                <el-table-column prop="gs_brand" label="品牌" width="150"></el-table-column>
                <el-table-column prop="gs_sales" label="销量" width="100"></el-table-column>
                <el-table-column prop="gs_store" label="库存" width="100"></el-table-column>
                <el-table-column label="用户评价" align="center" width="100">
                    <template slot-scope="{row}">
                        <!-- 查看评论 -->
                        <a class="rate">查看评论</a>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100" align="center">
                    <template slot-scope="{row}">
                        <span v-if="row.gs_state == 1" style="color: green; font-weight: 500;">上架中</span>
                        <span v-else style="color: red; font-weight: 500;">下架中</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button type="danger" icon="el-icon-bottom" size="mini" v-if="row.gs_state == 1"
                            @click="deleteTradeMark(row)">下架</el-button>
                        <el-button type="success" icon="el-icon-top" size="mini" v-if="row.gs_state == 0"
                            @click="deleteTradeMark(row)">上架</el-button>
                        <el-button icon="el-icon-paperclip" type="info" size="mini">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px; textAlign: center" :current-page.sync="page" :total="total"
                :page-size="limit" :page-sizes="[3, 5, 10]" :page-count="7" @current-change="getDate"
                @size-change="handleSizeChange" layout=" prev, pager, next, jumper,->,sizes,total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Product',
    data() {
        return {
            goods: [],
            show: false,
            // 代表分页器的第几页
            page: 1,
            // 当前页数展示数据条数
            limit: 3,
            // 总共数据条数
            total: 0,
            input: '',
            grade: ''
        }
    },
    mounted() {
        this.getDate()
    },
    methods: {
        // 分类品牌
        async getDate() {
            // 解构出参数
            const { page, limit } = this
            const result = await this.$API.business.reqGoods(page, limit);
            if (result.code == 200) {
                this.goods = result.data.goods;
                this.total = result.data.total
            }
        },
        // 当分页器某一页需要展示数据条数发生变化的时候会触发
        handleSizeChange(limit) {
            this.limit = limit
            this.getDate()
        },
    },
}
</script>

<style>

</style>