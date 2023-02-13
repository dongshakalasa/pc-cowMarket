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
                    <el-input placeholder="根据评价内容搜索" v-model="input">
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
            <el-table style="width: 100%" border :data="orderRateList">
                <el-table-column label="序号" width="80px" align="center" type="index">
                </el-table-column>
            <el-table-column label="评价图片" width="350">
                <template slot-scope="{row}">
                    <img :src="item" alt="" style="width:80px;height:80px;margin-right: 20px" v-for="(item, index) in row.orderGoodImgs" :key="index">
                    <span v-show="row.orderGoodImgs.length == 0">无</span>
                </template>
            </el-table-column>
                <el-table-column prop="oe_text" label="评价内容"></el-table-column>
                <el-table-column prop="oe_date" label="评价时间" width="100"></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" icon="el-icon-circle-close" @click="deleteTradeMark(row)"></el-button>
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
    name: 'Order',
    data() {
        return {
            orderRateList: [],
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
            const result = await this.$API.business.reqOrderRate(page, limit);
            if (result.code == 200) {
                this.orderRateList = result.data.orderRateList;
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