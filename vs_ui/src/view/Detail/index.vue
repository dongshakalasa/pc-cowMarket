<template>
    <!-- 商品详情 -->
    <div class="detail">
        <div class="w">
            <div class="main">
                <!-- 标题 -->
                <h2>{{detailList.gs_name}}<span class="collect" :class="{'el-icon-star-on ':collect,'el-icon-star-off':!collect}" @click="collectGoods()"> </span></h2>
                <!-- 上部 -->
                <div class="top clearfix">
                    <div class="left">
                        <div class="big">
                            <img :src="bigImg" alt="">
                        </div>
                        <div class="smalls">
                            <img :src="img.gs_il_imgs" v-for="img in imgs" :key="img.gs_il_id" class="cut" @click="bigImg = img.gs_il_imgs">
                        </div>
                    </div>
                    <div class="right">
                        <!-- 介绍 -->
                        <h3>
                            {{detailList.gs_text}}
                        </h3>
                        <div class="info">
                            <div class="price">
                                <span>价格：</span>
                                <em>￥{{detailList.gs_price}}元</em>
                            </div>
                            <div class="shipments">
                                <span>销量：</span>
                                <em>{{detailList.gs_sales}}</em>
                            </div>
                            <div class="shipments">
                                <span>库存：</span>
                                <em>{{detailList.gs_store}}</em>
                            </div>
                            <div class="number">
                                <span>发货时间：</span>
                                <em>{{detailList.gs_delivery}}</em>
                            </div>
                        </div>
                        <div class="operation">
                            <div class="number">
                                <div>
                                    <div class="add" @click="number++">+</div>
                                    <input type="text" v-model="number">
                                    <div class="minus" @click="number > 1?number--:1">-</div>
                                </div>
                            </div>
                            <button @click="setCart">加入购物车</button>
                        </div>
                    </div>
                </div>
                <!-- 下部 -->
                <div class="bottom">
                    <div class="container">
                        <div class="title clearfix">
                            <a @click="cut = true" :class="{cut:cut}">商品评价</a>
                            <a @click="cut = false" :class="{cut:!cut}">商品详情</a>
                        </div>
                        <!-- 子路由 -->
                        <Comment v-show="cut" :id="id"/>
                        <Introduce v-show="!cut" :goodsDetail="detailList"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Loading } from 'element-ui'
import Comment from './comment'
import Introduce from './introduce'
export default {
    name:'Detail',
    components:{Comment,Introduce},
    data(){
        return {
            // 商品id
            id:1,
            // 商品数据
            number:1,
            // 商品数据
            detailList:{},
            imgs:[],
            cut:false,
            bigImg:'',
            collect:true
        }
    },
    beforeMount(){
        this.id = this.$route.params.id;
    },
    mounted(){
        this.getData();
        this.judge()
    },
    methods:{
        // 
        async getData(){
            const result = await this.$API.detail.reqGetGoodsDetail(this.id)
            if(result.code == 200) {
                this.detailList = result.data.goodsDetail
                this.imgs = result.data.goodsImgsUrl
                this.bigImg = this.imgs[0].gs_il_imgs
            }else {
                this.$message.error(result.message)
            }
        },
        async setCart(){
            const result = await this.$API.detail.reqSetGoodsCar(this.id,this.number);
            if(result.code == 200) {
                this.$message.success('添加成功');
            }else {
                this.$message.error('添加失败！')
            }
        },
        // 判断是否存在收藏
        async judge(){
            const result = await this.$API.detail.reqJudgeGoods(this.id);
            if(result.code == 200) {
                // console.log(result);
                this.collect = result.data
            }
        },
        // 星
        async collectGoods(){
            if(this.collect) {
                // 删除收藏
                const result = await this.$API.detail.reqDeleteGoods(this.id);
                console.log(result);
                if(result != 200) {
                    // this.$message.error("操作失败，请稍后重试！");
                }
            }else {
                // 添加收藏
                const result = await this.$API.detail.reqCollect(this.id);
                if(result.code == 200) {
                    this.$message.success("收藏成功！");
                }else if(result.code == 203) {
                    this.$message.warning(result.message)
                    this.$router.push("/login");
                }
            }
            this.judge();
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    background-color: #f6f6f6;
    .w {
        width: 1200px;
        margin: 0 auto;
        padding: 20px 10px;
        background-color: #fff;

        .main {
            border: 1px solid #e6e6e6;
            
            h2 {
                height: 50px;
                line-height: 50px;
                font-size: 21px;
                background-color: #f8f8f8;
                text-align: center;
                letter-spacing: 10px;
                font-family: '黑体';

                .collect {
                    float: left;
                    height: 50px;
                    line-height: 50px;
                    font-size: 30px;
                    font-weight: 700;
                    color: red;
                    cursor: pointer;
                    margin-left: 20px;
                }
            }

            .top {
                padding: 15px 15px;
                    .left {
                        float: left;
                        width: 500px;
                        height: 550px;

                        .big {
                            width: 400px;
                            height: 400px;
                            margin: 20px 50px;
                            border: 2px solid #e6e6e6;

                            img {
                                width: 400px;
                                height: 400px;
                            }
                        }
            
                        .smalls {
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            width: 400px;
                            height: 100px;
                            margin: 0 auto;
                            border: 2px solid #e6e6e6;

                            img {
                                width: 70px;
                                height: 70px;
                                padding: 2px;
                                cursor: pointer;
                            }

                        }
                    }
            
                    .right {
                        float: right;
                        width: 660px;
                        height: 550px;

                        h3 {
                            height: 100px;
                            line-height: 50px;
                            margin: 20px 0;
                            margin-right: 50px;
                            padding-left: 20px;
                            letter-spacing: 2px;
                            background-color: #f8f8f8;
                        }

                        .info {
                            border: 2px solid #efefef;
                            padding-left: 30px;
                            margin-right: 50px;

                            >div {
                                display: flex;
                                justify-content: space-between;
                                height: 50px;
                                width: 280px;
                                line-height: 50px;
                                margin-bottom: 5px;

                                span {
                                    width: 90px;
                                    font-size: 18px;
                                    font-weight: 700;
                                }

                                em {
                                    width: 130px;
                                    font-size: 15px;
                                    font-weight: 500;
                                }
                            }

                            .price {
                                height: 60px;
                                line-height: 60px;

                                em {
                                    width: 140px;
                                    color: red;
                                    font-size: 20px;
                                    font-weight: 700;
                                }
                            }
                        }

                        .operation {
                            width: 610px;
                            height: 135px;
                            margin-top: 20px;
                            padding-top: 15px;
                            border: 2px solid #e6e6e6;

                            .number {
                                height: 55px;

                                >div {
                                    display: flex;
                                    justify-content: center;
                                    width: 180px;
                                    height: 45px;
                                    line-height: 45px;
                                    font-size: 20px;
                                    margin-left: 195px;

                                    input {
                                        width: 90px;
                                        text-align: center;
                                    }

                                    div {
                                        width: 40px;
                                        text-align: center;
                                        border: 1px solid #e6e6e6;

                                        &:hover {
                                            cursor: pointer;
                                            background-color: #fd7400;
                                        }
                                    }
                                }
                            }

                            button {
                                margin-left: 220px;
                                margin-top: 15px;
                                height: 50px;
                                width: 130px;
                                border: 0;
                                font-size: 15px;
                                color: #fff;
                                background-color: #e1251b;
                                cursor: pointer;
                            }
                        }
                    }
            }

            .bottom {
                padding-top: 40px;
                padding: 0 60px;

                .container {
                    width: 100%;
                    padding-top: 20px;
                    
                    .title {
                        padding-bottom: 2px;
                        border-bottom: 2px solid #fd7400;
                        a {
                            float: left;
                            width: 150px;
                            height: 50px;
                            line-height: 50px;
                            font-size: 18px;
                            text-align: center;
                            letter-spacing: normal;
                            font-weight: 300;
                            margin-right: 20px;
                            border: 1px solid #e6e6e6;
                            cursor: pointer;
                        }

                        .cut {
                            color: #fff;
                            font-weight: 700;
                            background-color: #fd7400;
                        }
                    }
                }  
            }
        }
    }
}
</style>