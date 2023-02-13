<template>
  <div class="window">
    <Header></Header>
    <Toolbar v-show="$route.meta.show" />
    <!-- 路由组件的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'App',
  components:{
      Header,
      Toolbar
    }
}
</script>

<style>
  .window {
    width: 100%;
    height: 100%;
  }
</style>

