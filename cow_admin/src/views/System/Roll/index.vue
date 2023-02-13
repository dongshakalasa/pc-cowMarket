<template>
  <div>
    <el-card>
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>
      <el-table style="width: 100%" border :data="imgs">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="{row}">
            <img :src="row.rl_img" alt="" style="width:700px;height:400px">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <!-- slot-scope="{row}" -->
          <template>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'roll',
  data() {
    return {
      imgs: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await this.$API.system.reqRollInfo();
      if (result.code == 200) {
        this.imgs = result.data
      }
    },
  }
}
</script>

<style>

</style>