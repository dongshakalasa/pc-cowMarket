<template>
    <div class="toolber" >
        <div class="w" >
            <!-- 平台导航 -->
            <!-- <div class="cut home">
                <span class="el-icon-s-home icon"></span>
                <span @click="goHome">首页</span>
            </div> -->
            <div @mouseenter="showSort = true" @mouseleave="showSort = false">
                <span class="el-icon-s-operation icon"></span>
                <span >产品分类</span>
                <!-- 分类列表 -->
                <transition name="el-zoom-in-top">
                <div class="sort transition-box" v-show="showSort">
                    <div class="productSort" v-for="(sort, index) in sortNameList" :key="index" @click="goSearchById(sort.st_id,sort.st_name)">
                        <div class="img">
                            <img :src="sort.st_img" alt="">
                        </div>
                        <div class="text">
                            {{sort.st_name}}
                        </div>
                    </div>
                </div>
                
                </transition>
            </div>
            <div @click="$router.push('/search')">
                <span class="el-icon-shopping-bag-2 icon"></span>
                <span>产品商城</span>
            </div>
            <div>
                <span class="el-icon-connection icon"></span>
                <span>热门资讯</span>
            </div>
            <div>
                <span class="el-icon-postcard icon"></span>
                <span>公告信息</span>
            </div>
            <div>
                <span class="el-icon-help icon"></span>
                <span>系统反馈</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showSort:false,
            sortNameList:{},
        }
    },
    mounted(){
        this.getSortNameList();
    },
    methods: {
        async getSortNameList(){
            const result = await this.$API.home.reqGetSortList();
            if(result.code == 200) {
                this.sortNameList = result.data;
            }
        },
        // 分类
        goSearchById(id,name) {
            this.$router.push({
                name:'search',
                query:{
                    id:id,
                    name:name
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.toolber {
    margin-top: 1px;
    height: 50px;
    line-height: 50px;
    background-color: #7f2330;

    .w {
        position: relative;
        display: flex;
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;

        > div {
            padding: 0 40px;
            cursor: pointer;
            border: 1px solid #c72b41;

            &:hover {
                background-color: #c72b41;
            }
        }

        // .cut {
        //     background-color: #c72b41;
        //     font-weight: 500;
        // }

        .home {
            width: 100px;
        }

        .icon {
                display: inline-block;
                font-size: 20px;
                margin-right: 10px;
            }

        .sort {
            position: absolute;
            left: 0;
            top: 50px;
            display: flex;
            // height: 50px;
            z-index: 999;
            background-color: #c72b41;

            .productSort {
                width: 200px;
                height: 200px;
                margin: 10px 0;
                margin-right: 20px;
                border-left: 1px solid #eeeeee;

                .img {
                    margin: 0 auto;
                    width: 150px;
                    height: 150px;
                
                    img {
                            width: 150px;
                            height: 150px;
                            border-radius: 30px;
                        }
                }

                .text {
                    text-align: center;
                    font-family: '宋体';
                }
                        
            }
        }
    }
}
</style>