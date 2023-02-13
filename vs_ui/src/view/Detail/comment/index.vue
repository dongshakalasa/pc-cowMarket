<template>
    <div class="orderRate">
        <div class="each clearfix" v-for="(orderRate,index) in orderRateList" :key="index">
            <div class="left">
                <div class="info">
                    <img :src="orderRate.user.ur_img" alt="">
                    <span>{{orderRate.user.ur_account}}</span>
                </div>
            </div>
            <div class="right">
                <div class="rate">
                    <el-rate
                        v-model="orderRate.orderRate.oe_rate"
                        :colors="colors"
                        :show-text="true"
                        :disabled="true">
                    </el-rate>
                </div>
                <div class="info">
                    <span>{{orderRate.orderRate.oe_text}}</span>
                </div>
                <div class="img">
                    <div v-for="(img,index) in orderRate.ImgList" :key="index">
                        <el-image 
                            style="width: 64px; height: 64px"
                            :src="img" 
                            :preview-src-list="orderRate.ImgList">
                        </el-image>
                    </div>
                </div>
                <div class="datetime">
                    {{orderRate.orderRate.oe_date}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Comment',
    props:["id"],
    data() {
      return {
        orderRateList:[],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      }
    },
    mounted(){
        this.getData()
    },
    methods:{
        // 初始化页面
        async getData(){
            const result = await this.$API.detail.reqGetGoodsRateDetail(this.id)
            if(result.code == 200) {
                this.orderRateList = result.data
            }
        }
    }
}
</script>


<style lang="less" scoped>
.orderRate {
    padding: 20px 0;
    padding-top: 40px;
    .each {
        margin-bottom: 40px;
        padding: 10px 0;
        border-top: 2px solid #e6e6e6;

        .left {
            float: left;
            width: 22%;
            height: 50px;
            line-height: 50px;
            padding: 20px 20px;

            .info {
                display: flex;
                font-size: 15px;

                img {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    border-radius: 15px;
                }

                span {
                    height: 50px;
                    width: 150px;
                    overflow: hidden;
                }
            }
        }

        .right {
            float: left;
            width: 72%;

            .rate {
                height: 35px;
                padding-top: 10px;
            }
            .info {
                padding: 10px;
                line-height: 30px;
                padding-left: 0;
                font-size: 14px;
                background-color: #fff;
            }

            .img {
                display: flex;
                height: 80px;
                border: 1px solid #e6e6e6;

                >div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 80px;


                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 5px;
                        cursor: pointer;

                        &:hover {
                            border: 2px solid #fd7400;
                        }
                    }
                }
            }

            .datetime {
                padding-top: 20px;
                font-size: 13px;
            }
        }
    }
}
</style>>

<style lang="less">
    .el-icon-star-on {
        font-size: 27px;
    }

    .el-rate__text{
        font-size: 15px;
    }
</style>
