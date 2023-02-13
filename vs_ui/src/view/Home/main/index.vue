<template>
  <div class="main">
    <div class="w clearfix">
      <!-- 热门产品 -->
      <div class="hotProduct">
        <h2>热销产品</h2>
        <!-- 产品 -->
        <div v-for="goods in hotGoodsList" :key="goods.gs_id" @click="goDetail(goods.gs_id)">{{goods.gs_name}}</div>
      </div>
      <div class="lunbo">
        <!-- 轮播图 -->
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="./img/2.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 功能栏 -->
    <div class="zone">
      <div @mouseenter="showTitle = true" @mouseleave="showTitle = false">
        <div class="el-icon-chat-dot-round icon"></div>
        <div class="title">公告</div>
        <!-- 公告内容 -->
        <div class="announcement" v-show="showTitle">
          <h2>公告内容</h2>
          <div class="text">
            <div class="textTitle">维护通知</div>
            <div class="textMain">
              <p>
                我们将在北京时间2022年11月26日 08点30分开始对网站进行停服更新
                <br>
                -维护时间：预计4个小时
                <br>
                -维护内容：网页内容
              </p>
            </div>
          </div>
        </div>
      </div>
      <div @mouseenter="showService = true" @mouseleave="showService = false">
        <div class="el-icon-service icon"></div>
        <div class="title">客服微信</div>
        <!-- 微信二维码 -->
        <img src="./img/erweima.jpg" alt="" class="img" v-show="showService">
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      showTitle:false,
      showService:false
    }
  },
  props: ["hotGoodsList"],
  methods:{
    goDetail(id) {
      this.$router.push({
        name:'detail',
        params:{id:id}
      })
    }
  }
}
</script>

<style lang="less">
  .lunbo {
      float: left;
      padding-top: 3px;
      width: 1000px;
      height: 500px;
      margin: 0 auto;

      //轮播图
      .el-carousel.el-carousel--horizontal {
        float: left;
        padding-top: 3px;
        width: 1000px;
        height: 500px;
        margin: 0 auto;

        .el-carousel__container {
          width: 100%;
          height: 500px!important;

          img {
            width: 100%;
            height: 500px;
          }
        }
      }
    }
</style>

<style lang="less">
.main {
  position: relative;
  // background-color: #eeeeee;
  .w {
    width: 1200px;
    margin: 0 auto;
  
  //热门商品
    .hotProduct {
      float: left;
      width: 180px;
      height: 500px;
      margin-top: 5px;
      margin-right: 10px;
      font-family: 'Courier New', Courier, monospace;
      // background-color: #c72b41;
      // border-top-left-radius: 15px;
      // border-top-right-radius: 15px;
      border: 1px solid #c72b41;

      h2 {
        text-align: center;
        padding: 24px 0;
        // border-radius: 15px;
        letter-spacing: 10px;
        font-size: 21px;
        font-weight: 700;
        color: #fefefe;
        background-color: #c72b41;
        
      }

      div {
        padding: 11px 0;
        padding-left: 15px;
        overflow: hidden;
        cursor: pointer;
        font-weight: 500;
        font-family: '黑体';
        font-size: 15px;
        color: black;
        border-bottom: 1px solid #fe7a22;

        &:hover {
          background-color: #fe7a22;
          padding-left: 25px;
        }
      }
    }
  }

  //功能区
  .zone {
    position: absolute;
    top: 150px;
    right: 0;
    width: 80px;
    height: 220px;
    padding-top: 10px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: #c72b41;

    > div {
      width: 60px;
      height: 80px;
      margin: 10px 10px;
      margin-bottom: 20px;
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      .icon {
        width: 60px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 40px;
      }

      .title {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
      }
    }
    // 公告
    .announcement {
        position: absolute;
        top: 0px;
        right: 82px;
        width: 180px;
        height: 300px;
        background-color: #c72b41;
        border-radius: 5px;
        z-index: 999;
        color: #fe7a22!important;
        font-family: 'Courier New', Courier, monospace;

        h2 {
          height: 50px;
          line-height: 50px;
          text-align: center;
          letter-spacing: 10px;
          font-size: 25px;
          text-shadow: 0 0 1px #fff,0 0 1px #fff,0 0 1px #fff,0 0 1px #fff;
          border-bottom: 1px solid #7f2330;
        }

        .text {
          width: 180px;
          height: 250px;
          padding: 0 5px;
        }

        .textTitle {
            font-size: 22px;
            margin: 10px 0;
        }

        .textMian {
          overflow: hidden;
          margin-top: 20px;
          background-color: pink;

          text-indent: 2em;
          font-size: 30px;
          line-height:30px;
        }

    }
    // 客服
    .img {
      position: absolute;
      top: 120px;
      right: 83px;
      width: 100px;
      height: 100px;
      z-index: 998;
      border: 1px solid #c72b41;
    }
  }

  
  
  .service {
    position: absolute;
    top: 0;
    right: 0;
  }
}

</style>