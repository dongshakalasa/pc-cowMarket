<template>
    <div class="floor">
        <div class="top clearfix">
            <div class="fl">{{sortList.name}}</div>
            <div class="fr">
                <span @click="goSearch(sortList.id)">查看更多</span>
                <span class="el-icon-d-arrow-right"></span>
            </div>
        </div>
        <div class="bottom">
            <div v-for="goods in sortList.hotGoodsList" :key="goods.gs_id" @click="goDetail(goods.gs_id)">
                <div class="img">
                    <img :src="goods.gs_img" alt="">
                </div>
                <div class="introduce">
                    <span class="pirce">
                        <span>￥</span>
                        <span class="number">{{goods.gs_price}}</span>
                    </span>
                    <span class="text">{{goods.gs_name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['sortList'],
    methods:{
        goSearch(sortId){
            let location = {
                name:'search',
                query:{id:sortId || undefined}
            }
            this.$router.push(location);
        },
        goDetail(id){
            this.$router.push({
                name:'detail',
                params:{id:id}
            })
        }
    }
}
</script>

<style lang="less" scoped>
.floor {
    width: 1200px;
    height: 300px;
    margin: 0 auto;
    margin-top: 40px;
    border-top: 2px solid #f10a29;

    .top {
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        background-color: #fff;
        font-family: '宋体';

        .fl {
            float: left;
            font-size: 20px;
            font-family: '宋体';
            font-weight: 700;
            letter-spacing: 7px;  
        }

        .fr {
            float: right;
            font-size: 18px;
            cursor: pointer;

            &:hover {
                color: #c72b41;
            }
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        >div {
            width: 220px;
            height: 270px;
            background-color: #f7b080;
            cursor: pointer;

            &:hover {
                box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, .25);
                margin-top: -6px;
            }

            .img {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 220px;
                height: 180px;
                padding: 0 auto;
                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 15px;
                    margin: 0 auto;
                }
            }

            .introduce {
                text-align: center;
                height: 70px;
                display: flex;
                flex-direction: column;

                .pirce {
                    display: flex;
                    justify-content: center;
                    height: 30px;
                    line-height: 30px;
                    font-weight: 700;
                    font-size: 20px;
                    color: #f10a29;

                    .number {
                        padding-right: 30px;
                    }
                }

                .text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    height: 40px;
                    line-height: 40px;
                    font-size: 13px;
                    letter-spacing: 2px;
                    font-family: '宋体';
                }
            }
        }
    }
}

</style>