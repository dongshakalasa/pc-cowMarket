<template>
  <!-- 商品详情 -->
    <div class="introduce">
        <div class="info">
            <div class="brand">品牌：<span>{{goodsDetail.gs_brand}}</span></div>
            <div class="attribute">
                <ul class="clearfix">
                    <li>商品名称：{{goodsDetail.gs_name}}</li>
                    <li>商品编号：{{goodsDetail.gs_id}}</li>
                    <li>毛重：{{goodsDetail.gs_weight}}g</li>
                    <li>商品产地：{{goodsDetail.gs_poo}}</li>
                </ul>
                <ul class="clearfix">
                    <li>品种：{{goodsDetail.gs_variety}}</li>
                    <li>饲养方式：{{goodsDetail.gs_feeding}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Introduce',
    props:["goodsDetail"]
}
</script>

<style lang="less" scoped>
.introduce {
    padding: 0 65px;
    padding-bottom: 50px;
    .info {
        font-family: 'Microsoft YaHei';
        font-size: 14px;

        .brand {
            margin: 30px 0;
            margin-top: 70px;
        }
        
        .attribute {

            ul { 
                font-size: 14px;
                li {
                    float: left;
                    height: 30px;
                    line-height: 30px;
                    width: 200px;
                    margin-right: 35px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>>
