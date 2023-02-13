<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>

<template>
  <div>
    <el-card>
        <!-- 按钮 -->
        <el-table style="width: 100%;" border :data="info">
            <el-table-column label="序号" width="80px" align="center" type="index">
            </el-table-column>
            <el-table-column prop="name" label="属性名" width="120px" align="center">
            </el-table-column>
            <el-table-column label="属性值">
                <template slot-scope="{row}">
                    <el-tag v-for="(value,index) in row.values" :key="index" closable type="">
                        {{value}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <!-- slot-scope="{row}" -->
                <template>
                    <el-button type="success" icon="el-icon-edit" size="mini">添加</el-button>
                    <!-- <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'Platform',
    data(){
        return {
            info:[]
        }
    },
    mounted(){
        this.getDate()
        console.log(1);
    },
    methods: {
        async getDate(){
            const result = await this.$API.system.reqPlatformInfo()
            this.info = result.data
        }
    }
}
</script>

<style>

</style>