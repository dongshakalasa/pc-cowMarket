<template>
  <div>
    <!-- 分类 -->
    <el-card>
      <div style="display: flex;">
        <div style="width: 180px; ">
          <el-input placeholder="根据标题搜索" v-model="input">
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
      <el-table style="width: 100%" border :data="announcements">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column prop="at_title" label="公告标题" width="300" ></el-table-column>
        <el-table-column prop="at_text" label="公告内容" width="300"></el-table-column>
        <el-table-column prop="at_time" label="发布时间" width="300"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
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
  name: 'Announcement',
  data() {
    return {
      announcements: [],
      show: false,
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      input: ''
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
      const result = await this.$API.system.reqAnnouncement(page, limit);
      if (result.code == 200) {
        this.announcements = result.data.announcements;
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