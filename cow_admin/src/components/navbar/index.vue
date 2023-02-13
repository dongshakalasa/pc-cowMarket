<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <!-- @select="handleSelect" -->
                <el-menu 
                :efault-active="1" 
                class="el-menu-vertical-demo" 
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b">

                    <el-menu-item index="1" @click="$router.push('/admin/home')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-help"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="$router.push('/roll')">滚动图片</el-menu-item>
                            <el-menu-item index="2-2" @click="$router.push('/platform')">商品属性管理</el-menu-item>
                            <el-menu-item index="2-3" @click="$router.push('/brand')">品牌管理</el-menu-item>
                            <el-menu-item index="2-4" @click="$router.push('/announcement')">公告管理</el-menu-item>
                            <el-menu-item index="2-5" @click="$router.push('/message')">用户反馈</el-menu-item>
                            <el-menu-item index="2-6" @click="$router.push('/information')">热门资讯</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3" @click="$router.push('/user')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>业务管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1" @click="$router.push('/product')">商品管理</el-menu-item>
                            <el-menu-item index="4-2" @click="$router.push('/order')">订单管理</el-menu-item>
                            <el-menu-item index="4-3" @click="$router.push('/orderRate')">评价管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            index: '1'
        }
    },
    
}
</script>