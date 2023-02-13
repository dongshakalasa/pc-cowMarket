<template>
  <div class="login">
    <h3>用户登录</h3>
    <div class="loginform">
        <ul class="tab clearFix">
            <li  @click="cut = true">
                <router-link to="/login/code" :class="{current:cut}" style="border-right: 0;">验证码登录</router-link>
            </li>
            <li @click="cut = false">
                <router-link to="/login/account" :class="{current:!cut}">账户登录</router-link>
            </li>
        </ul>
        <!-- 出口 -->
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
        return {
            cut:true
        }
    }
  }
</script>

<style lang="less" scoped>
.login {
    height: 500px;
    width: 1200px;
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #dfdfdf;

    h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;
        }

    .loginform {
            width: 420px;
            height: 406px;
            box-sizing: border-box;
            background: #fff;
            margin: 0 auto;
            top: 45px;
            position: relative;
            padding: 20px;
    
            .tab {
    
                li {
                    width: 50%;
                    float: left;
                    text-align: center;
    
                    a {
                        width: 100%;
                        display: block;
                        height: 50px;
                        line-height: 50px;
                        font-size: 20px;
                        font-weight: 700;
                        color: #333;
                        border: 1px solid #ddd;
                        box-sizing: border-box;
                        text-decoration: none;
    
                    }
    
                    .current {
                        border-bottom: none;
                        border-top-color: #28a3ef;
                        color: #e1251b;
                    }
                }
            }
    
            
        }
}
</style>