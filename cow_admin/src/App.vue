style>
.el-breadcrumb {
    height: 100%!important;
    line-height: 60px;
    font-size: 20px;
    padding-left: 15px;
  }
</style>

<style lang="less" scoped>
.w {
  width: 100%;
  height: 100%;

  .navbar {
    transition: width 0.28s;
    width: 250px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .info {
    min-height: 100%;
    margin-left: 250px;
    position: relative;

    .top {
      display: flex;
      justify-content: space-between;
      height: 60px;
      border-bottom: 1px solid #e6e6e6;

      .left {
        height: 100%;
        line-height: 90px;
        width: 50%;
        font-size: 30px;
      }

      .right {
        padding-right: 60px;
        display: flex;
        justify-content: right;
        align-items: center;
        width: 50%;

        img {
          border-radius: 10px;
        }

        i {
          width: 50px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;

          &:hover {
            color: red;
            cursor: pointer;
          }
        }
      }
    }

        .bottom {
          min-height: calc(100vh - 115px);
          width: 96%;
          position: relative;
          overflow: hidden;
          padding: 2%;
          padding-bottom: 0;
          display: block;
          box-sizing: inherit;
        }
  }
}
</style>>

<template>
  <div class="w">
    <div class="navbar">
      <navbar />
    </div>
    <div class="info">
      <div class="top">
        <div class="left">
        </div>
        <div class="right">
          管理员admin
        </div>
      </div>
      <div class="bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  name: 'App',
  components:{
    navbar
  }
}
</script>

<style>
.el-breadcrumb {
  height: 100% !important;
  line-height: 60px;
  font-size: 20px;
  padding-left: 15px;
}
</style>


