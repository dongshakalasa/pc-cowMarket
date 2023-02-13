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
        <div style="margin-left: 50px">
          <el-select placeholder="根据订单状态筛查" v-model="grade">
            <el-option :label="tm" :value="tm" v-for="(tm,index) in categoryList" :key="index"></el-option>
          </el-select>
        </div>
      </div>
    </el-card>

    <!-- 公告 -->
    <el-card style="margin-top: 30px">
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>
      <el-table style="width: 100%" border :data="orderList">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <!-- <el-table-column label="默认图片" align="center" width="200">
          <template slot-scope="{row}">
            <img :src="row.gs_img" alt="" style="width:80px;height:80px">
          </template>
        </el-table-column> -->
        <el-table-column prop="or_uuid" label="订单号" width="313"></el-table-column>
        <el-table-column label="商品">
          <template slot-scope="{row}">
            <span style="margin-right: 10px;" v-for="goods in row.orderGoods" :key="goods.or_gs_id">{{ goods.or_gs_name }} * {{ goods.or_gs_number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="or_price"  label="订单金额" width="100"></el-table-column>
        <el-table-column label="收货人信息" width="400">
          <template slot-scope="{row}">
            <span style="margin-right: 10px;">{{ row.or_name }}</span>
            <span style="margin-right: 10px;">{{ row.or_phone }}</span>
            <span style="margin-right: 10px;">{{ row.or_address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100" align="center">
          <template slot-scope="{row}">
            <span v-if="row.or_state == 0" style="font-weight: 500;">待发货</span>
            <!-- <spanv v-if="row.or_datetime == 1" style="color: red; font-weight: 500;">下架中</spanv> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" v-if="row.or_state == 0"
              @click="deleteTradeMark(row)">发货</el-button>
            <el-button type="success" size="mini" v-if="row.or_state == 1"
              @click="deleteTradeMark(row)">上架</el-button>
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
      orderList: [],
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
      const result = await this.$API.business.reqOrder(page, limit);
      if (result.code == 200) {
        this.orderList = result.data.orderList;
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