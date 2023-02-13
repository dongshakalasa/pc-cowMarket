<template>
  <div>
    <!-- 分类 -->
    <el-card>
      <div style="display: flex;">
        <div style="width: 180px; ">
          <el-input placeholder="根据账号搜索" v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div style="margin-left: 10px">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
        <div style="margin-left: 50px">
          <el-select placeholder="根据会员等级筛查" v-model="grade">
            <el-option :label="tm" :value="tm" v-for="(tm,index) in categoryList" :key="index"></el-option>
          </el-select>
        </div>
      </div>
    </el-card>

    <!-- 公告 -->
    <el-card style="margin-top: 30px">
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>
      <el-table style="width: 100%" border :data="users">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column label="头像" align="center" width="300">
          <template slot-scope="{row}">
            <img :src="row.ur_img" alt="" style="width:80px;height:80px">
          </template>
        </el-table-column>
        <el-table-column prop="ur_account" label="账号" width="300"></el-table-column>
        <el-table-column prop="ur_scorecard" label="积分" width="200"></el-table-column>
        <el-table-column prop="ur_grade" label="会员等级" width="200"></el-table-column>
        <el-table-column prop="at_time" label="账号状态" width="200" align="center">
          <template slot-scope="{row}">
            <span v-if="row.ur_state == 1">正常</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="danger" icon="el-icon-circle-close" size="mini" v-if="row.ur_state == 1" @click="deleteTradeMark(row)">冻结</el-button>
            <el-button type="success" icon="el-icon-circle-check" size="mini" v-if="row.ur_state == 0"
              @click="deleteTradeMark(row)">解除</el-button>
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
  name: 'User',
  data() {
    return {
      users: [],
      show: false,
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      input: '',
      grade:''
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
      const result = await this.$API.user.reqUser(page, limit);
      if (result.code == 200) {
        this.users = result.data.users;
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