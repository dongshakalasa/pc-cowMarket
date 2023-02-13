<template>
    <div class="header">
        <!-- 第一层 -->
        <div class="one" ref="a">
            <div class="w clearfix">
                <div class="left">
                    <span>欢迎访问<a href="">亿头牛!</a></span>
                </div>
                <div class="middle">
                    来自自然，归于健康
                </div>
                <div class="right" v-show="!account">
                    <span class="spanColor" @click="$router.push('/login')">登录</span>
                    <span @click="$router.push('/register')">注册</span>
                </div>
                <div class="right" v-show="account">
                    <span class="spanColor" @click="$router.push('/person')"><span class="iconfont icon-yonghuming"></span>个人中心</span>
                    <span @click="logout"><span class="iconfont icon-tuichudenglu"></span>退出</span>
                </div>
            </div>
        </div>
        <!-- 第二层 -->
        <div class="two clearfix">
            <div class="w">
                <div class="logo" @click="goHome" style="cursor: pointer;">
                    <!-- logo -->
                    <img src="./img/logo.webp" alt="">
                </div>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
                <div class="cart " @click="goCart">
                    <span class="el-icon-shopping-cart-2 cartIcon"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>removeToken
import {getToken,removeToken} from '@/utils/token'
export default {
    name:'Header',
    data(){
        return {
            keyword:'',
            account:'',
            token:getToken()
        }
    },
    methods: {
        async getSortNameList(){
            const result = await this.$API.home.reqGetSortList();
            if(result.code == 200) {
                this.sortNameList = result.data;
            }
        },
        // 搜索按钮
        goSearch(){
            let keyword = this.keyword.trim();
            if(keyword == ''){
                this.$message({message:'搜索信息为空',type:"warning"})
            }else {
                let location = {
                    name: "search",
                    params: { keyword: keyword || undefined },
                };
                this.$router.push(location);
            } 
        },
        // 购物车按钮
        goCart(){
            this.$router.push('/cart')
        },
        // 首页
        goHome(){
            this.$router.push('/home')
        },
        async goAuthLogin(){
            const result = await this.$API.user.reqUserAuthLogin();
            if(result.code == 200) {
                this.account = result.data;
            }else {
                removeToken();
                this.$router.push('/home')
                // this.$message({message:result.message,type:"warning"})
            }
        },
        async logout(){
            const result = await this.$API.user.reqLogout();
            if(result.code == 200) {
                this.$message("退出成功！")
                this.token = ''
                this.account = ''
                removeToken();
            }else {
                this.$message(result.message)
            }
        }
        
    },
    mounted(){
        this.$bus.$on("sendAccount", (account) => {
            this.account = account;
        })
    },
    watch:{
        token:{
            immediate:true,//初始化时执行一次handler
            // isHot的值发生了改变就执行handler函数
            handler(newValue,oldValue){
                this.goAuthLogin()
            }
        }
    }
}
</script >
<style scoped lang="less">
.header {
    // border-bottom: 2px solid red;

    .two {
        height: 85px;
        line-height: 85px;

        .w {
            width: 1200px;
            height: 100%;
            background-color: #ffffff;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        
            .logo {
                height: 100%;
        
                img {
                    width: 150px;
                    height: 75px;
                }
            }
        
            .searchArea {
                float: right;
                margin-top: 20px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 390px;
                        height: 45px;
                        padding: 0px 4px;
                        border: 2px solid #7f2330;
                        float: left;
                        border-right: 0;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 45px;
                        line-height: 45px;
                        width: 68px;
                        background-color: #7f2330;
                        border: none;
                        color: #fff;
                        float: left;
                        font-size: 17px;
                        cursor: pointer;
                        font-family: 'Courier New', Courier, monospace;

                        &:hover {
                            background-color: #c72b41;
                        }

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        
            .cart {
                width: 100px;

                &:hover {
                    color: #fe7a22;
                }

                .cartIcon {
                  cursor: pointer;
                  display: inline-block;
                  margin-top: 20px;
                  font-size: 50px;
                }

            }
        }
    }

    .one {
        height: 40px;
        line-height: 40px;
        background-color: #fafafa;
        border-bottom: 1px solid #dfdfdf;

        .w {
            width: 1200px;
            margin: 0 auto;

            .left {
                float: left;

                span {
                    font-size: 17px;
                    font-family: '黑体';

                    a {
                        font-size: 13px;
                        color: #fe7a22;
                    }
                }
            }

            .middle {
                float: left;
                margin-left: 390px;
                font-size: 18px;
                font-family: '楷体';
            }


            .right {
                float: right;

                span {
                    display: inline-block;
                    height: 100%;
                    padding: 0 15px;
                    font-weight: 500;
                    font-size: 16px;
                    background-color: #eeeeee;
                    cursor: pointer;

                    .iconfont {
                        // padding: 0;
                        // padding-right: 5px;
                        font-weight: 700;
                        font-size: 20px;
                    }

                }

                .spanColor {
                    background-color: #fe7a22;
                    color: #ffffff;

                    span {
                        background-color: #fe7a22;
                    }
                }
            }
        }
    }

}
</style>
