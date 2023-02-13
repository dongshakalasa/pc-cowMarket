<template>
    <div class="main">
        <div class="py-container">
            <!--bread-->
            <div class="bread">
                <ul class="fl sui-breadcrumb">
                    <li>
                        <a href="#">全部结果</a>
                    </li>
                </ul>
                <ul class="fl sui-tag">
                    <li class="with-x" v-if="selectInfo.name != undefined">
                        {{selectInfo.name }}
                        <i @click="selectInfo.name=undefined;selectInfo.id = 0;getData()">×</i>
                    </li>
                    <li class="with-x" v-if="selectInfo.keyword != undefined&&selectInfo.keyword != ''">
                        {{selectInfo.keyword}}
                        <i @click="selectInfo.keyword=undefined;getData()">×</i>
                    </li>
                    <li class="with-x" v-show="selectInfo.brand != ''">
                        {{selectInfo.brand}}
                        <i @click="selectInfo.brand='';getData()">×</i>
                    </li>
                    <li class="with-x" v-show="selectInfo.variety != ''">
                        {{selectInfo.variety}}
                        <i @click="selectInfo.variety='';getData()">×</i>
                    </li>
                    <li class="with-x" v-show="selectInfo.poo != ''">
                        {{selectInfo.poo}}
                        <i @click="selectInfo.poo='';getData()">×</i>
                    </li>
                    <li class="with-x" v-show="selectInfo.feeding != ''">
                        {{selectInfo.feeding}}
                        <i @click="selectInfo.feeding='';getData()">×</i>
                    </li>
                </ul>
            </div>
            <!--selector-->
            <div class="clearfix selector">
                <div class="type-wrap logo">
                    <div class="fl key brand">品牌</div>
                    <div class="value logos">
                        <ul class="logo-list">
                            <li v-for="(brand, index) in attributeInfo.brandList" :key="index" @click="updateAttribute('品牌',brand)">{{brand}}</li>
                        </ul>
                    </div>
                    <!-- <div class="ext">
                        <a href="javascript:void(0);" class="sui-btn">多选</a>
                        <a href="javascript:void(0);">更多</a>
                    </div> -->
                </div>
                <div class="type-wrap" v-for="(attribute,index) in attributeInfo.AttributeNameValueList" :key="index">
                    <div class="fl key">{{attribute.name}}</div>
                    <!-- 品牌 -->
                    <div class="fl value">
                        <ul class="type-list">
                            <li v-for="(value,index) in attribute.valueList" :key="index" @click="updateAttribute(attribute.name,value)" >
                                <a>{{value}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li :class="{active:selectInfo.order == 1?true:false}" @click="selectInfo.order = 1;getData();">
                                <a href="#">销量⬆</a>
                            </li>
                            <li :class="{active:selectInfo.order == 2?true:false}" @click="selectInfo.order = 2;getData();">
                                <a href="#">销量⬇</a>
                            </li>
                            <li :class="{active:selectInfo.order == 3?true:false}" @click="selectInfo.order = 3;getData();">
                                <a href="#">价格⬆</a>
                            </li>
                            <li :class="{active:selectInfo.order ==4 ?true:false}" @click="selectInfo.order = 4;getData();">
                                <a href="#">价格⬇</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-5" v-for="goods in searchInfo" :key="goods.gs_id">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <a><img :src="goods.gs_img"  @click="goDetail(goods.gs_id)"/></a>
                                </div>
                                <div class="price">
                                    <strong>
                                            <em>¥</em>
                                            <i>{{goods.gs_price}}</i>
                                        </strong>
                                </div>
                                <div class="attr">
                                    <a  @click="goDetail(goods.gs_id)">{{goods.gs_name}}{{goods.gs_text}}</a>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>{{goods.gs_sales}}</span>人购买</i>
                                </div>
                                <div class="operate">
                                    <a  class="sui-btn btn-bordered btn-danger" @click="open(goods.gs_id)">加入购物车</a>
                                    <a class="sui-btn btn-bordered" @click="collect(goods.gs_id)">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="fr page">
                    <el-pagination @current-change="handleCurrentChange"
                        :hide-on-single-page="total < 10"
                        :current-page="page"
                        background
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            total:11,
            page:1,
            selectInfo:{
                id:0,
                brand:'',
                order:1,
                pageNo:0,
                pageSize:10,
                keyword: "",
                variety:'',
                poo:'',
                feeding:''
            },
            searchInfo:[],
            attributeInfo:[]
        }
    },
    methods:{
        // 获取商品属性
        async getAttribute(){
            const result = await this.$API.search.reqSelectAttribute();
            if(result.code == 200) {
                this.attributeInfo = result.data
            }else {
                this.$message('加载失败...')
            }
        },
        // 搜索商品
        async getData(){
            const result = await this.$API.search.reqSelectInfo(this.selectInfo);
            if(result.code == 200) {
                this.total = result.data.total;
                this.searchInfo = result.data.goodsList;
            }else {
                this.$message('加载失败...')
            }
        },
        // 更改页码
        handleCurrentChange(page){
            this.selectInfo.pageNo = (page-1) * 10
            this.getData();
        },
        // 更新属性值
        updateAttribute(name,value){
            if(name == "品牌"){
                this.selectInfo.brand = value;
            }
            if(name == "品种"){
                this.selectInfo.variety = value;
            }
            if(name == "原产地"){
                this.selectInfo.poo = value;
            }
            if(name == "饲养方式"){
                this.selectInfo.feeding = value;
            }
            this.getData();
        },
        // 商品详情
        goDetail(id){
            console.log(1);
            this.$router.push({
                name:'detail',
                params:{id:id}
            })
        },
        // 加入购物车
         open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                const result = await this.$API.search.reqSetCart(id);
                if(result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else {
                    this.$message.error(result.message)
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 收藏商品
        async collect(id){
            const result = await this.$API.search.reqJudgeGoods(id);
            if(result.code == 200) {
                if(result.data){
                    this.$message.warning("商品已收藏！")
                }else {
                    const result = await this.$API.search.reqCollect(id);
                    if(result.code == 200) {
                        this.$message.success("收藏成功！");
                    }else if(result.code == 203) {
                        this.$message.warning(result.message)
                        this.$router.push("/login");
                    }
                }
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
    },
    watch: {
    // 监听路由信息
    $route(newValue, oldValue) {
      Object.assign(this.selectInfo, this.$route.query, this.$route.params);
      this.selectInfo.brand = '';
      this.selectInfo.variety = '';
      this.selectInfo.poo = '';
      this.selectInfo.feeding = '';
      this.getData();
    },
    },
    beforeMount() {
        Object.assign(this.selectInfo, this.$route.query, this.$route.params);
    },
    mounted(){
        this.getData();
        this.getAttribute();
    },
}
</script>

<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #e1251b;
    color: #fff;
  }
</style>

<style lang="less" scoped>
.main{
        margin: 10px 0;
        .py-container{
            width: 1200px;
            margin: 0 auto;
            .bread{
                margin-bottom: 5px;
                overflow: hidden;
                .sui-breadcrumb{
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float:left;
                    li{
                        display: inline-block;
                        line-height: 18px;
                        a{
                            color: #666;
                            text-decoration: none;
                            &:hover{
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                .sui-tag{
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    .with-x{
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition:color 400ms;
                        cursor: pointer;
                        i{
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        &:hover{
                            color: #28a3ef;
                        }
                    }
                }
            }
            .selector{
                border: 1px solid #ddd;
                margin-bottom: 5px;
                overflow: hidden;
                .logo{
                    border-top: 0;
                    margin: 0;
                    position: relative;
                    overflow: hidden;
                    .key{
                        padding-bottom: 87px!important;
                    }
                }
                .type-wrap{
                    margin: 0;
                    position: relative;
                    border-top: 1px solid #ddd;
                    overflow:hidden;
                    .key{
                        width: 100px;
                        background: #f1f1f1;
                        line-height: 26px;
                        text-align: right;
                        padding: 10px 10px 0 15px;
                        float:left;
                    }
                    .value{
                        overflow: hidden;
                        padding: 10px 0 0 15px;
                        color: #333;
                        margin-left: 120px;
                        padding-right: 90px;
                        .logo-list{
                            li{
                                float: left;
                                border: 1px solid #e4e4e4;
                                margin: -1px -1px 0 0;
                                width: 105px;
                                height: 52px;
                                text-align: center;
                                line-height: 52px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 700;
                                color: #e1251b;
                                font-style: italic;
                                font-size: 14px;
                                img{
                                    max-width: 100%;
                                    vertical-align: middle;
                                }
                            }
                        }
                        .type-list{
                            li{
                                float: left;
                                display: block;
                                margin-right: 30px;
                                line-height: 26px;
                                a{
                                    text-decoration: none;
                                    color: #666;
                                }
                            }
                        }
                    }
                    .ext{
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        .sui-btn{
                            display: inline-block;
                            padding: 2px 14px;
                            box-sizing: border-box;
                            margin-bottom: 0;
                            font-size: 12px;
                            line-height: 18px;
                            text-align: center;
                            vertical-align: middle;
                            cursor: pointer;
                            padding: 0 10px;
                            background: #fff;
                            border: 1px solid #d5d5d5;
                        }
                        a{
                            color: #666;
                        }
                    }
                }
            }
            .details{
                margin-bottom: 5px;
                .sui-navbar{
                    overflow: visible;
                    margin-bottom: 0;
                    .filter{
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        .sui-nav{
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            li{
                                float: left;
                                line-height: 18px;
                                a{
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                &.active{
                                    a{
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                .goods-list{
                    margin: 20px 0;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        li{
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;

                            img {
                                    max-width: 100%;
                                    height: 225px;
                                    vertical-align: middle;
                                }

                            .list-wrap{
                                .p-img{
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 225px;
                                    a{
                                        color: #666;
                                    }
                                }
                                .price{
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: 2px;
                                        }
                                    }
                                }
                                .attr{
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    a{
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                .commit{
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    span{
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                .operate{
                                    padding: 12px 15px;
                                    .sui-btn{
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    .btn-bordered{
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        &:hover{
                                            border: 1px solid #666;
                                            color: #fff!important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    .btn-danger{
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        &:hover{
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color:white!important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .page{
                    width: 763px;
                    height: 66px;
                    overflow: hidden;
                    float: right;
                }
            }
            .hot-sale{
                margin-bottom: 5px;
                border: 1px solid #ddd;
                .title{
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 21px;
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    margin: 0;
                    padding: 5px 0 5px 15px;
                }
                .hot-list{
                    padding: 15px;
                    ul{
                        display:flex;
                        li{
                            width:25%;
                            height: 100%;
                            .list-wrap{
                                .p-img,.price,.attr,.commit{
                                    padding-left: 15px;
                                }
                                .p-img{
                                    img{
                                        max-width: 100%;
                                        vertical-align: middle;
                                        border: 0;
                                    }
                                }
                                .attr{
                                    width: 85%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                }
                                .price{
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .commit{
                                    height:22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                }
                            }
                        }
                    }
                }
            }
        }
}
</style>>